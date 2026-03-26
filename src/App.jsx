import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabaseClient";

function App() {
  //states
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function fetchTasks() {
    const { data, error } = await supabase.from("Test").select("*");

    if (error) {
      console.log(error);
      return;
    }

    setRows(data || []);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function removeTask(id) {
    const { error } = await supabase.from("Test").delete().eq("id", id);

    if (error) {
      console.log(error);
      return;
    }
    fetchTasks();
  }
  async function addTask() {
    if (!title.trim() || !description.trim()) {
      alert("Please enter title and description");
      return;
    }
    const { error } = await supabase.from("Test").insert([
      {
        title: title,
        description: description,
      },
    ]);

    if (error) {
      console.log(error);
      return;
    }

    setTitle("");
    setDescription("");
    fetchTasks();
  }

  return (
    <>
      <h1>Todo List</h1>

      <div className="form-box">
        <h2>Add New Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
          className="form-control"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          className="form-control"
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="table-box">
        <h2>Tasks</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    onClick={function() { removeTask(item.id); }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
