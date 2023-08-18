function TodoItem(props) {
	let poo = { ...props.props };
	const {
		todo,
		editableId,
		setModifiedTodoTitle,
		handleUpdate,
		handleEdit,
		handleDelete,
	} = poo;

	return (
		<li
			key={todo.id}
			className='list-group-item d-flex justify-content-between align-items-center'
		>
			{editableId === todo.id ? (
				<input
					type='text'
					className='form-control w-75 '
					defaultValue={todo.title}
					onChange={(e) => setModifiedTodoTitle(e.target.value)}
				/>
			) : (
				<span>{todo.title}</span>
			)}
			<div>
				{editableId === todo.id ? (
					<button
						className='btn btn-warning me-2'
						onClick={() => handleUpdate(todo.id)}
					>
						Update
					</button>
				) : (
					<>
						<button
							className='btn btn-success me-2'
							onClick={() => handleEdit(todo.id)}
						>
							Edit
						</button>
						<button
							className='btn btn-danger'
							onClick={() => handleDelete(todo.id)}
						>
							Delete
						</button>
					</>
				)}
			</div>
		</li>
	);
}

export default TodoItem;
