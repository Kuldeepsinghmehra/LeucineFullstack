const supaBase=require('../Config/supaBaseClient')
exports.getTodos = async (req, res) => {
  const { data, error } = await supaBase.from('Todos').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
};

exports.addTodo = async (req, res) => {
  const { Title } = req.body; 
  const { data, error } = await supaBase
    .from('Todos') 
    .insert([{ "Title": Title, "Completed": false }]) 
    .select();

  if (error) return res.status(500).json({ error });
  res.status(201).json(data[0]);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  const { error } = await supaBase
    .from('Todos')
    .delete()
    .eq('Id', id); 

  if (error) {
    return res.status(500).json({ error });
  }

  res.status(204).send(); 



};

  exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { Title, Completed } = req.body;

  const { data, error } = await supaBase
    .from('Todos')
    .update({ Title, Completed })
    .eq('Id', id)
    .select();
 console.log('Supabase update result:', { data, error });
  if (error) return res.status(500).json({ error });

  if (!data || data.length === 0) {
    return res.status(404).json({ message: 'Todo not found or not updated' });
  }

  res.json(data[0]);
};
