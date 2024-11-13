import { createRef, useRef } from "react";
import { motion } from "framer-motion";
import noTodos from "../images/Detective-check-footprint-dark.svg";
import { Save } from "lucide-react";

const TodoSection = ({
  filteredToDoData = [],
  handleTaskCompleted,
  handleDeleteTask,
  handleEditTask,
}) => {
  const inputRefs = useRef([]);

  inputRefs.current = filteredToDoData.map(
    (_, index) => inputRefs.current[index] ?? createRef()
  );

  const toDoElements = filteredToDoData.map((task, index) => {
    return (
      <motion.div
        key={task.id}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className={`bg-slate-600/50 border border-purple-500/50 drop-shadow-md rounded-xl cursor-pointer ${
          task.taskCompleted && "opacity-50"
        }`}
        onClick={() => {
          if (!task.editTask) {
            handleTaskCompleted(task.id);
          }
        }}
      >
        <div className="px-4 py-3 flex flex-col">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditTask(task.id);
              inputRefs.current[index]?.current?.blur();
            }}
            className="relative"
          >
            {/* Task text as input so can be edited */}
            <input
              ref={inputRefs.current[index]}
              value={task.task}
              onChange={(e) => {
                handleEditTask(task.id, e.target.value);
              }}
              className={`text-slate-100 font-semibold text-lg bg-transparent w-full pointer-events-none text-center focus:outline-none ${
                task.taskCompleted && "line-through"
              } ${
                task.editTask &&
                "pointer-events-auto bg-slate-800 px-2 pb-1  rounded font-thin flex items-center"
              }`}
            />
            {task.editTask && (
              <button type="submit" className="absolute right-2 top-1">
                <Save className="text-indigo-300" />
              </button>
            )}
          </form>

          {/* Edit and Delete buttons */}
          <div className="flex items-center gap-4 mt-4 justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditTask(task.id);
              }}
              className={`text-indigo-400 hover:text-indigo-300 px-2 py-1 ${
                task.taskCompleted && "pointer-events-none"
              }`}
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTask(task.id);
              }}
              className="text-red-400 hover:text-red-300 px-2 py-1"
            >
              Delete
            </button>
          </div>

          {/* Created and Completed dates */}
          <small className="italic mt-4 opacity-50 text-center">
            {task.taskCompleted ? "Completed on" : "Created @"}{" "}
            {task.taskCompleted ? task.completedOn : task.createdOn}
          </small>
        </div>
      </motion.div>
    );
  });

  return (
    <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      {filteredToDoData.length > 0 ? (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 py-4 max-h-96 overflow-auto"
        >
          {/* Todo Div (Dashboard Style) */}
          {toDoElements}
        </motion.section>
      ) : (
        <div className="max-w-96 mx-auto text-center mt-28">
          <img src={noTodos} className="w-full" />
          <h1 className="text-4xl font-light">nothing to do...</h1>
        </div>
      )}
    </div>
  );
};

export default TodoSection;
