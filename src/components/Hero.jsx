import useLocalStorage from "../hooks/useLocalStorage";
import InputAndFilter from "./InputAndFilter";
import TodoSection from "./TodoSection";
import getDateFunction from "../js/getDate";
import { useEffect, useState } from "react";

const Hero = () => {
  const [toDoData, setToDoData] = useLocalStorage("toDoData", []);
  const [filteredToDoData, setFilteredToDoData] = useState(toDoData);
  const [activeFilter, setActiveFilter] = useState("All"); // Track the active filter

  // Set filtered data
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredToDoData(toDoData);
    } else if (activeFilter === "Done") {
      setFilteredToDoData(toDoData.filter((task) => task.taskCompleted));
    } else if (activeFilter === "Not Done") {
      setFilteredToDoData(toDoData.filter((task) => !task.taskCompleted));
    }
  }, [toDoData, activeFilter]);

  function handleAddTask(taskName) {
    const dateCreated = getDateFunction(); // Set time created as current value

    if (taskName.trim() === "") return; // Prevent adding empty tasks

    const newTask = {
      id: toDoData.length + 1, // Simple ID increment
      task: taskName,
      createdOn: dateCreated,
      completedOn: "",
      taskCompleted: false,
      editTask: false,
    };
    setToDoData([...toDoData, newTask]);
  }

  function handleTaskCompleted(taskId) {
    const dateCompleted = getDateFunction(); // Set time created as current value
    setToDoData((prevData) => {
      return prevData.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            taskCompleted: !task.taskCompleted,
            completedOn: dateCompleted,
          };
        }
        return task;
      });
    });
  }

  function handleDeleteTask(taskId) {
    setToDoData(toDoData.filter((task) => task.id !== taskId));
  }

  function handleEditTask(taskId, updatedTask = null) {
    setToDoData((prevData) => {
      return prevData.map((task) => {
        if (task.id === taskId) {
          return updatedTask !== null
            ? { ...task, task: updatedTask } // Update task text
            : { ...task, editTask: !task.editTask }; // Toggle edit state
        }
        return task;
      });
    });
  }

  function handleSearchTask(searchValue) {
    if (searchValue.trim() === "") {
      setFilteredToDoData(toDoData); // Reset to show all if search is empty
    } else {
      const filteredTask = toDoData.filter((task) =>
        task.task.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredToDoData(filteredTask);
    }
  }

  // Handle filter change (All, Done, Not Done)
  function handleFilterChange(filter) {
    setActiveFilter(filter);

    if (filter === "All") {
      setFilteredToDoData(toDoData); // Show all tasks
    } else if (filter === "Done") {
      setFilteredToDoData(toDoData.filter((task) => task.taskCompleted)); // Show only completed tasks
    } else if (filter === "Not Done") {
      setFilteredToDoData(toDoData.filter((task) => !task.taskCompleted)); // Show only not completed tasks
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 lg:py-12 pt-8">
      <InputAndFilter
        handleAddTask={handleAddTask}
        handleSearchTask={handleSearchTask}
        handleFilterChange={handleFilterChange} // Pass filter change handler
      />
      <TodoSection
        filteredToDoData={filteredToDoData} // Pass filtered data
        handleTaskCompleted={handleTaskCompleted}
        handleDeleteTask={handleDeleteTask}
        handleEditTask={handleEditTask}
      />
    </div>
  );
};

export default Hero;
