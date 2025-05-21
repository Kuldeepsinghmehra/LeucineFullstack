const TodoItem = ({ todo, onDelete }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
      <p>{todo.Title}</p>
      <button onClick={() => onDelete(todo.Id)} className="text-red-600">
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
