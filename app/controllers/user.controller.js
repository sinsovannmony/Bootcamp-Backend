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
        const checkuser = await User.findOne({ where: { username: req.body.username } });
        if (checkuser) return res.status(400).json({ message: "Username already exist" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
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
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) return res.status(400).json({ message: "incorrect username" });
        const validate = await bcrypt.compare(req.body.password, user.password);
        if (!validate) return res.status(400).json({ message: "incorrect password" });
        const token = jwt.sign({ username: user.username, id: user.id }, process.env.TOKEN_SECRET, {
            expiresIn: "15m",
        });
        const refreshToken = jwt.sign({ username: user.username, id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "30m",
        });
        refreshTokens.push(refreshToken);
        return res.status(200).json({ message: "login successfully", AccessToken: token, RefreshToken: refreshToken });
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
                const accessToken = jwt.sign({ username: user.username, id: user.id }, process.env.TOKEN_SECRET, {
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

exports.security = async (req, res) => {
    try {
        return res.status(200).json({ message: "I'm secure now!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
