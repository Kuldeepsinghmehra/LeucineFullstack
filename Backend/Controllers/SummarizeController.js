const supaBase =require('../Config/supaBaseClient')
const {summarizeTodos}=require('../Services/llmService')
const {sendToSlack}=require('../Services/slackService')

exports.summarizeAndSend = async (req, res) => {
  try {
   const { data: todos, error } = await supabase.from('Todos').select('*').eq('completed', false);

    if (error) {
      console.error('Supabase fetch error:', error);
      return res.status(500).json({ error: 'Error fetching todos' });
    }

    if (!todos || todos.length === 0) {
      return res.status(400).json({ error: 'No pending todos to summarize' });
    }

    const summary = await summarizeTodos(todos);
    console.log("this is summary frpm openAi",summary)
    await sendToSlack(summary);
    res.json({ message: 'Summary sent to Slack' });
  } catch (error) {
    console.error('Summarize error:', error);
    res.status(500).json({ error: 'Failed to summarize and send to Slack' });
  }
};
