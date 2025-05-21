import { useEffect, useState } from 'react';
import TodoItem from '../Components/TodoItem';
import TodoForm from '../Components/TodoForm';
import SummaryBanner from '../Components/SummaryBanner';
import api from '../Services/api';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [banner, setBanner] = useState(null);

  const fetchTodos = async () => {
    try {
      const res = await api.get('/todos');
      setTodos(res.data || []);
      console.log("this is response", res);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setBanner({ message: 'Failed to load todos.', success: false });
      setTimeout(() => setBanner(null), 3000);
    }
  };

  const addTodo = async (title) => {
    try {
      await api.post('/todos', { title });
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      setBanner({ message: 'Failed to add todo.', success: false });
      setTimeout(() => setBanner(null), 3000);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      setBanner({ message: 'Failed to delete todo.', success: false });
      setTimeout(() => setBanner(null), 3000);
    }
  };

  const summarizeTodos = async () => {
    try {
      await api.post('/summarize');
      setBanner({ message: 'Summary sent to Slack!', success: true });
    } catch (err) {
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
      {todos.map(todo => (
        <TodoItem key={todo.Id} todo={todo} onDelete={deleteTodo} />
      ))}
      <button onClick={summarizeTodos} className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">
        Summarize & Send to Slack
      </button>
    </div>
  );
};

export default Home;
