import User from "../models/userModel.js";

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = await User.create({ name, email, password });
        const token = newUser.generateAuthToken();
        console.log("user token", token);
        res.cookie("token", token, {
            httpOnly: true,

        });

        res.status(201).json({
            success: true,
            data: newUser,
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = user.generateAuthToken();
        res.cookie("token", token, {
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            data: user,
            message: "User logged in successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "No token found" });
        }

        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
