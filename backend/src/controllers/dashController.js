exports.getDashboardData = async (req, res) => {
    try {
        const user = req.user; // from the JWT middleware
        if (!user) return res.status(404).json({ message: 'Please log in to view details!' });
    
        // You can fetch full user from DB here if needed
        res.status(200).json({ success: true, user: req.user });
      } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
      }
}