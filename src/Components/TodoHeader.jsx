function TodoHeader(props) {
	let poo = { ...props.props };
	const { newTodoTitle, setNewTodoTitle, handleAddTodo } = poo;
	return (
		<div className='mb-3'>
			<input
				type='text'
				className='form-control w-75 '
				placeholder='New Todo Title'
				value={newTodoTitle}
				onChange={(e) => setNewTodoTitle(e.target.value)}
			/>
			<button className='btn btn-primary mt-2' onClick={handleAddTodo}>
				Add Todo
			</button>
		</div>
	);
}

export default TodoHeader;
