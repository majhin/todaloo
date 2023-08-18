import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoHeader from "./TodoHeader";
import TodoItem from "./TodoItem";

function TodoContainer() {
	const [todos, setTodos] = useState([]);
	const [editableId, setEditableId] = useState(null);
	const [newTodoTitle, setNewTodoTitle] = useState("");
	const [modifiedTodoTitle, setModifiedTodoTitle] = useState("");

	useEffect(() => {
		// Fetch todo items from the API
		axios
			.get("https://jsonplaceholder.typicode.com/todos")
			.then((response) => {
				const firstTenTodos = response.data.slice(0, 5); // Get the first 10 todos
				setTodos(firstTenTodos);
			})
			.catch((error) => {
				console.error("Error fetching todo items:", error);
			});
	}, []);

	const handleEdit = (id) => {
		setEditableId(id);
	};

	const handleUpdate = (id) => {
		// Dummy PUT request to simulate updating a todo
		axios
			.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
				title: modifiedTodoTitle,
				completed: false,
			})
			.then((response) => {
				// Update the state with the updated todo
				const updatedTodos = todos.map((todo) =>
					todo.id === id ? { ...todo, title: modifiedTodoTitle } : todo
				);
				setTodos(updatedTodos);
				setEditableId(null);
			})
			.catch((error) => {
				console.error("Error updating todo:", error);
			});
	};

	const handleDelete = (id) => {
		// Delete the todo item locally
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);

		// Handle delete action on the server (dummy call)
		axios
			.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
			.catch((error) => {
				console.error(`Error deleting todo with id ${id}:`, error);
			});
	};

	const handleAddTodo = () => {
		// Dummy POST request to simulate adding a new todo
		axios
			.post("https://jsonplaceholder.typicode.com/todos", {
				title: newTodoTitle,
				userId: 1,
			})
			.then((response) => {
				response.data.id = todos.length + 1;
				// Add the completed property with value false
				const newTodo = { ...response.data, completed: false };

				// Update the state with the new todo
				setTodos((prevTodos) => [...prevTodos, newTodo]);
			})
			.catch((error) => {
				console.error("Error adding new todo:", error);
			});
		setNewTodoTitle("");
	};

	return (
		<div>
			<h1 className='mt-4 mb-3'>Todo List</h1>
			<TodoHeader props={{ newTodoTitle, setNewTodoTitle, handleAddTodo }} />
			<ul className='list-group'>
				{todos.map((todo) => (
					<TodoItem
						key={todo.id}
						props={{
							todo,
							editableId,
							setModifiedTodoTitle,
							handleUpdate,
							handleEdit,
							handleDelete,
						}}
					/>
				))}
			</ul>
		</div>
	);
}

export default TodoContainer;
