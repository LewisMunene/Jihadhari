const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Make sure we have a JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_123';

exports.register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Email is already registered. Please use a different email address.'
            });
        }

        // Create new user
        const user = await User.create({
            fullName,
            email,
            password
        });

        // Generate token
        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Remove password from output
        user.password = undefined;

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            status: 'error',
            message: error.code === 11000 
                ? 'Email already exists' 
                : 'Error registering user. Please try again.'
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Remove password from output
        user.password = undefined;

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error logging in'
        });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching user data'
        });
    }
};