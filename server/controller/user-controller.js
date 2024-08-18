const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

// sign up controller

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log({ error: "Email already exists " });
            return res.status(400).json({ message: "Email already exists " });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created sucessfully ", newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExist = await User.findOne({ username });
        if (!userExist) {
            //user not exist 
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const user = await bcrypt.compare(password, userExist.password);
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { user_id: userExist._id.toString(), username: userExist.username, isAdmin: userExist.isAdmin },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token, username: userExist.username, userid: userExist._id.toString() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { signup, login }