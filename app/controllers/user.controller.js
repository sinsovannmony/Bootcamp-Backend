const db = require('../models');
const User = db.user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {loginValidation,registerValidation} = require('../middlewares/validation');

exports.register = async (req, res) => {
    try {
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const checkuser = await User.findOne({where: { username: req.body.username }});
        if (checkuser) return res.status(400).json({ message: 'Username already exist' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
        role: req.body.role,
        phone_number: req.body.phone_number,
        });
        await user.save();
        const userDetail = await User.findOne({where: { id: user.id }, attributes: { exclude: ['password']}});
        return res.status(200).json({ message: 'User register successfully', data: userDetail });
    } 
    catch (error) {
        return res.status(500).json(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const user = await User.findOne({ where: { username: req.body.username }});
        if (!user) return res.status(400).json({ message: 'incorrect username' });
        const validate = await bcrypt.compare(req.body.password, user.password);
        if (!validate) return res.status(400).json({ message: 'incorrect password' });
        const token = jwt.sign({ username: user.username, id: user.id }, process.env.TOKEN_SECRET, {expiresIn: '360000s'});
        return res.status(200).json({ message: 'Logged in successfully', token, user });
    } 
    catch (error) {
        return res.status(500).json(error);
    }
};
