import { FaTrash, FaEdit } from 'react-icons/fa';
console.log('TodoItem file loaded');
const TodoItem = ({ todo, onDelete, onEdit }) => {
   console.log('onEdit in TodoItem:', onEdit);
  return (
    <div
      className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2 shadow-sm 
                 transition-all duration-300 hover:bg-gray-200 hover:shadow-md hover:scale-[1.01] 
                 cursor-pointer active:scale-95"
    >
      <p className="text-gray-800">{todo.Title}</p>
      <div className="flex gap-3">
        <button
          onClick={() => onEdit(todo)}
          className="text-blue-500 hover:text-blue-700 transition-colors"
          title="Edit"
        >
          <FaEdit className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(todo.Id)}
          className="text-red-500 hover:text-red-700 transition-colors"
          title="Delete"
        >
          <FaTrash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
