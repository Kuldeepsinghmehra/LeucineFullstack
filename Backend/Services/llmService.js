exports.summarizeTodos = async (todos) => {
  if (!Array.isArray(todos) || todos.length === 0) {
    throw new Error('No todos to summarize');
  }

  const todoText = todos.map((t, i) => `${i + 1}. ${t.Title}`).join('\n');

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Summarize these pending todos clearly and concisely.' },
        { role: 'user', content: todoText }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content;
};
