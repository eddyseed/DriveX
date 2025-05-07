

const signup = async (req, res) => {
  const { email, password, firstName, middleName, lastName, role, mobile } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) return res.status(400).json({ error: error.message });

  const userId = data.user?.id;
  const { error: profileError } = await supabase.from('user_profiles').insert([{
    id: userId,
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    role,
    mobile
  }]);

  if (profileError) return res.status(500).json({ error: profileError.message });

  return res.status(200).json({ message: 'User signed up successfully', userId });
}




module.exports = { signup };
