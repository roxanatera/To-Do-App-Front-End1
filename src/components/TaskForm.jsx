import { useState } from "react";


export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      setIsSubmitting(true);
      await onAddTask({ title, description }); 
      setTitle("");
      setDescription("");
      setError("");
    } catch (err) {
      console.error("Error al crear la tarea:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Error al crear la tarea.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r mx-auto p-4 max-w-3xl bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-xl rounded-lg mt-12"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Nueva Tarea</h2>

      {error && (
        <p className="bg-red-500 text-white text-sm p-2 rounded mb-4">{error}</p>
      )}

      {/* Campo Título */}
      <div className="mb-5">
        <label className="block text-sm font-semibold mb-2">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Escribe el título de la tarea"
          disabled={isSubmitting}
        />
      </div>

      {/* Campo Descripción */}
      <div className="mb-5">
        <label className="block text-sm font-semibold mb-2">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Escribe una breve descripción de la tarea"
          rows="4"
          disabled={isSubmitting}
        ></textarea>
      </div>

      {/* Botón de Enviar */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 ${
          isSubmitting
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-800"
        }`}
      >
        {isSubmitting ? "Creando..." : "Crear Tarea"}
      </button>
    </form>
  );
}
