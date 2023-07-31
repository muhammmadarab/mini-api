const User = require('../models/user');

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user)
            return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
};

module.exports = {
    getUserById,
};
