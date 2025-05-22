
import { useEffect, useState } from 'react';

import TodoItem from '../Components/TodoItem';

import TodoForm from '../Components/TodoForm';

import SummaryBanner from '../Components/SummaryBanner';

import api from '../Services/api';

console.log('Imported TodoItem:', TodoItem);

const Home = () => {

  const [todos, setTodos] = useState([]);

  const [banner, setBanner] = useState(null);

  
  

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editingTodo, setEditingTodo] = useState(null);

  const [editTitle, setEditTitle] = useState('');

  
  

  const fetchTodos = async () => {

    try {

      const res = await api.get('/todos');

      setTodos(res.data || []);

    } catch (error) {

      setBanner({ message: 'Failed to load todos.', success: false });

      setTimeout(() => setBanner(null), 3000);

    }

  };

  
  

  const addTodo = async (title) => {

    try {

      await api.post('/todos', { Title: title });

      fetchTodos();

    } catch (error) {

      setBanner({ message: 'Failed to add todo.', success: false });

      setTimeout(() => setBanner(null), 3000);

    }

  };

  
  

  const deleteTodo = async (id) => {

    try {

      await api.delete(`/todos/${id}`);

      fetchTodos();

    } catch (error) {

      setBanner({ message: 'Failed to delete todo.', success: false });

      setTimeout(() => setBanner(null), 3000);

    }

  };

  

const toggleComplete = async (todo) => {

  try {

    await api.put(`/todos/${todo.Id}`, {

      ...todo,

      Completed: !todo.Completed,

    });

    fetchTodos();

  } catch (error) {

    setBanner({ message: 'Failed to update completion status.', success: false });

    setTimeout(() => setBanner(null), 3000);

  }

};

  const startEditing = (todo) => {

    setEditingTodo(todo);

    setEditTitle(todo.Title);

    setIsEditModalOpen(true);

  };

  
  

  const cancelEditing = () => {

    setIsEditModalOpen(false);

    setEditingTodo(null);

    setEditTitle('');

  };

  
  

  const saveEdit = async () => {

    if (!editTitle.trim()) return;

  

    try {

      await api.put(`/todos/${editingTodo.Id}`, { Title: editTitle, Completed: false });

      setIsEditModalOpen(false);

      setEditingTodo(null);

      setEditTitle('');

      fetchTodos();

    } catch (error) {

      setBanner({ message: 'Failed to update todo.', success: false });

      setTimeout(() => setBanner(null), 3000);

    }

  };

  

  const summarizeTodos = async () => {

    try {

      await api.post('/summarize');

      setBanner({ message: 'Summary sent to Slack!', success: true });

    } catch (error) {

      setBanner({ message: 'Failed to send summary.', success: false });

    }

    setTimeout(() => setBanner(null), 3000);

  };

  

  useEffect(() => {

    fetchTodos();

  }, []);

  

  return (

    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-4">📝 Todo Summary Assistant</h1>

      {banner && <SummaryBanner {...banner} />}

      <TodoForm onAdd={addTodo} />

  

      {/* Todo List */}

      {todos.map((todo) => (

        <TodoItem

          key={todo.Id}

          todo={todo}

          onDelete={deleteTodo}

          onEdit={startEditing}

           onToggleComplete={toggleComplete}

        />

      ))}

  

      <button

        onClick={summarizeTodos}

        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"

      >

        Summarize & Send to Slack

      </button>

  

      {/* Edit Modal */}

      {isEditModalOpen && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">

            <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>

            <input

              type="text"

              value={editTitle}

              onChange={(e) => setEditTitle(e.target.value)}

              className="border rounded w-full px-3 py-2 mb-4"

            />

            <div className="flex justify-end gap-3">

              <button

                onClick={cancelEditing}

                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"

              >

                Cancel

              </button>

              <button

                onClick={saveEdit}

                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"

              >

                Save

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

  

export default Home;