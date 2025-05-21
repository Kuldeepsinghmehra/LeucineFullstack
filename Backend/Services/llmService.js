const axios = require('axios');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

exports.summarizeTodos = async (todos, retries = 3, delay = 1000) => {
  if (!Array.isArray(todos) || todos.length === 0) {
    throw new Error('No valid todos provided for summarization');
  }

  // Prepare the input text for the model
  const todoText = todos.map((t, i) => `${i + 1}. ${t.Title || t.title || t.task || t.text}`).join('\n');
console.log("Using HuggingFace Token:", process.env.HF_API_TOKEN ? '[SET]' : '[MISSING]');
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        {
          inputs: `Summarize the following todos:\n${todoText}`
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000 // optional timeout 30 seconds
        }
      );

      // Huggingface inference returns an array of results
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data[0].summary_text;
      } else {
        throw new Error('Unexpected response format from Hugging Face API');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Rate limit hit, retry with exponential backoff
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
        // Other errors just throw
        throw error;
      }
    }
  }
};
