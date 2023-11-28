// App.js
import React, { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";

import { CATEGORIES, TASKS } from "../data";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [tasks, setTasks] = useState(TASKS);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleTaskSubmit = (newTask) => {
    // Create a new task with a unique id
    const taskWithId = { ...newTask, id: Date.now().toString() };
    // Update the tasks state
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
  };

  const handleTaskDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Filter tasks based on the selected category
  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.category === selectedCategory);

  return (
    <div className="App">
      <h2>My tasks</h2>
      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />
      <NewTaskForm categories={CATEGORIES} onTaskFormSubmit={handleTaskSubmit} />
      <TaskList tasks={filteredTasks} onDelete={handleTaskDelete} />
    </div>
  );
}

export default App;
