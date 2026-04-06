const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async ({ name, email, password, role }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role ? role.toLowerCase() : "viewer",
    })

    return user;
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return user;
};

const getUsers = async () => {
    return await User.find().select("-password");
};

const updateUserDetails = async (id, data) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");

    if (data.email && data.email !== user.email) {
        const emailTaken = await User.findOne({ email: data.email });
        if (emailTaken) throw new Error("Email already in use by another account");
    }

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data);
    return await user.save();
};

const deleteUserService = async (id) => {
    const user = await User.findByIdAndDelete(id);

    if (!user) throw new Error("User not found");

    return user;
}
module.exports = {
    registerUser,
    loginUser,
    getUsers,
    updateUserDetails,
    deleteUserService,
};