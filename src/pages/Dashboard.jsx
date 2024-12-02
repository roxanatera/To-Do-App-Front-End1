import React, { useEffect, useState } from "react";
import api from "../api/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error al obtener tareas:", error.response.data.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Tareas</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 mb-2 rounded">
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
