import { Search } from "lucide-react";
import { useState } from "react";

const InputAndFilter = ({
  handleAddTask,
  handleSearchTask,
  handleFilterChange,
}) => {
  const [newToDo, setNewToDo] = useState("");
  const [activeFilter, setActiveFilter] = useState("All"); // State for the active filter

  const handleButtonClick = (filter) => {
    setActiveFilter(filter); // Set the active filter
    handleFilterChange(filter); // Call the filter change handler
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-6 px-4">
      {/* Search Input */}
      <div className="relative w-full lg:w-1/4">
        <input
          type="text"
          name="search"
          id="search"
          autoComplete="off"
          onChange={(e) => handleSearchTask(e.target.value)}
          placeholder="Search tasks..."
          className="w-full bg-slate-700/75 px-3 py-2 rounded-xl pl-10 focus:outline-none focus:ring-1 focus:ring-slate-600 text-sm lg:text-base"
        />
        <Search className="absolute top-2 left-3" color="#a855f7" />
      </div>

      {/* Create TODO Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page refresh
          handleAddTask(newToDo);
          setNewToDo(""); // Clear the input after submission
        }}
        className="flex w-full lg:w-1/3 justify-center flex-shrink-0"
      >
        <input
          type="text"
          id="createNew"
          value={newToDo}
          placeholder="e.g Clean the car"
          autoComplete="off"
          onChange={(e) => setNewToDo(e.target.value)}
          className="w-[70%] bg-slate-700/75 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-600 text-sm lg:text-base flex-shrink-0"
        />
        <button
          type="submit"
          className="ml-4 ring-1 ring-purple-500/50 hover:ring-purple-500 px-6 py-2 rounded-full flex-shrink-0 text-sm lg:text-base"
        >
          Create New
        </button>
      </form>

      {/* Select ALL | DONE | NOT DONE */}
      <div className="flex font-medium gap-6 text-slate-100/75 w-full lg:w-fit justify-end space-x-4 lg:space-x-6">
        <button
          onClick={() => handleButtonClick("All")}
          className={`uppercase ${
            activeFilter === "All" ? "text-purple-500" : ""
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleButtonClick("Done")}
          className={`uppercase ${
            activeFilter === "Done" ? "text-purple-500" : ""
          }`}
        >
          Done
        </button>
        <button
          onClick={() => handleButtonClick("Not Done")}
          className={`uppercase ${
            activeFilter === "Not Done" ? "text-purple-500" : ""
          }`}
        >
          Not Done
        </button>
      </div>
    </div>
  );
};

export default InputAndFilter;
