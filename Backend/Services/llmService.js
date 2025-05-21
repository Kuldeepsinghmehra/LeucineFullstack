exports.summarizeTodos = async (todos) => {
  if (!Array.isArray(todos) || todos.length === 0) {
    console.error('Invalid todos input:', todos);
    throw new Error('No valid todos provided for summarization');
  }

  const todoText = todos.map((t, i) => `${i + 1}. ${t.Title}`).join('\n');
  console.log('Todo text for LLM:', todoText);
  
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
