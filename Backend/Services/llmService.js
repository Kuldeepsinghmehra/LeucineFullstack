const axios = require('axios');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

exports.summarizeTodos = async (todos, retries = 3, delay = 1000) => {
  if (!Array.isArray(todos) || todos.length === 0 || todos.every(t => t.Completed)) {
    throw new Error('No valid todos provided for summarization');
  }

  const pendingTodos = todos.filter(t => !t.Completed);
  const todoText = pendingTodos.map((t, i) => `${i + 1}. ${t.Title}`).join('\n');

  console.log("Using HuggingFace Token:", process.env.HF_API_TOKEN ? '[SET]' : '[MISSING]');
  console.log("Sending to HuggingFace model: facebook/bart-large-cnn");

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        {
          inputs: `Here are the pending tasks:\n${todoText}\n\nWrite a concise reminder note summarizing what needs to be done.`
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data && Array.isArray(response.data) && response.data.length > 0 && response.data[0].summary_text) {
        return response.data[0].summary_text.trim();
      } else {
        throw new Error('Unexpected response format from Hugging Face API');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        if (attempt < retries) {
          console.warn(`Rate limited. Retry attempt ${attempt + 1} after ${delay}ms...`);
          await sleep(delay);
          delay *= 2;
          continue;
        } else {
          console.error('Max retries reached. Hugging Face API rate limit exceeded.');
          throw new Error('Hugging Face API rate limit exceeded. Please try again later.');
        }
      } else {
        console.error('Error from Hugging Face:', error.message);
        throw error;
      }
    }
  }
};
