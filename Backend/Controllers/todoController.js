const supaBase=require('../Config/supaBaseClient')
exports.getTodos = async (req, res) => {
  const { data, error } = await supaBase.from('Todos').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
};

exports.addTodo = async (req, res) => {
  const { title } = req.body; 
  const { data, error } = await supaBase
    .from('Todos') 
    .insert([{ "Title": title, "Completed": false }]) 
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