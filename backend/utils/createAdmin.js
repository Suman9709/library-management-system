import User from "../models/userModel.js";

export const createAdmin = async () => {
    try {

        const adminExists = await User.findOne({ email: "adm" });

        if (!adminExists) {

            await User.create({
                name: "Admin",
                email: "adm",
                password: "adm",
                role: "admin"
            });

            console.log("Admin created successfully");

        } else {

            console.log("Admin already exists");

        }

    } catch (error) {
        console.log("Admin creation error:", error);
    }
};