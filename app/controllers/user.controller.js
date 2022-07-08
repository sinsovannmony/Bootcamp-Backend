const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let refreshTokens = [];
const { loginValidation, registerValidation } = require("../middlewares/validation");

exports.register = async (req, res) => {
    try {
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const checkuser = await User.findOne({ where: { email: req.body.email } });
        if (checkuser) return res.status(400).json({ message: "Email already exist" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        await user.save();
        const userDetail = await User.findOne({ where: { id: user.id }, attributes: { exclude: ["password"] } });
        return res.status(200).json({ message: "User register successfully", data: userDetail });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(400).json({ message: "email is not correct or registered" });
        // const validate = await bcrypt.compare(req.body.password, user.password);
        if (req.body.password != user.password) return res.status(400).json({ message: "incorrect password" });
        // if (!validate) return res.status(400).json({ message: "incorrect password" });
        const token = jwt.sign({ email: user.email, id: user.id }, process.env.TOKEN_SECRET, {
            expiresIn: "15m",
        });
        const refreshToken = jwt.sign({ email: user.email, id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "30m",
        });
        refreshTokens.push(refreshToken);
        return res
            .status(200)
            .json({ message: "login successfully", AccessToken: token, RefreshToken: refreshToken, Data: user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.refresh_token = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken || !refreshTokens.includes(refreshToken)) {
            return res.json({ message: "Refresh token not found, login again" });
        }
        // If the refresh token is valid, create a new accessToken and return it.
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (!err) {
                const accessToken = jwt.sign({ email: user.email, id: user.id }, process.env.TOKEN_SECRET, {
                    expiresIn: "20s",
                });
                return res.json({ success: true, accessToken });
            } else {
                return res.json({ success: false, message: "Invalid refresh token" });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.forget_password = async (req, res) => {
    try {
        const email = await User.findOne({ where: { email: req.body.email } });
        if (!email) return res.status(400).json({ message: "Incorrect email input! Please double check" });
        if (req.body.password === req.body.confirm_password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            await User.update({ password: hashedPassword }, { where: { email: req.body.email } });
            return res.status(200).json({ message: "forget password sucessful" });
        }
        return res.status(400).json({ message: "Both password does not match! Please recheck" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.security = async (req, res) => {
    try {
        return res.status(200).json({ message: "I'm secure now!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.permission = async (req, res) => {
    try {
        return res.status(200).json({ message: "Allow permission from React Native" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.query_user = async (req, res) => {
    try {
        const user_data = await User.findAll();
        return res.status(200).json(user_data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
