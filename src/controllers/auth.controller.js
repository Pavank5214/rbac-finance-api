const { registerUser, loginUser,getUsers,updateUserDetails,deleteUserService } = require("../services/auth.service");
const generateToken = require("../utils/generateToken");

const register = async(req,res)=>{
    try {
        const user = await registerUser(req.body);
        
        res.status(201).json({
            message: "user registered successfully",
            user:{
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const login = async(req,res)=>{
    try {
        const user = await loginUser(req.body);
        const token = generateToken(user);
        res.status(201).json({
            message: "Login successfull",
            token,
            user:{
                id:user._id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};

const users = async(req,res) =>{
    try{
        const user = await getUsers();
        res.status(200).json(
            user,
        );
    } catch(error){
        res.status(500).json({
            message : "Cant fetch users",
        });
    }
};

const updateUser = async(req,res) => {
    try{
        const user = await updateUserDetails(req.params.id,req.body);

        res.json({
            message: "User updated",
            user,
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        });
    }
};

const deleteUser = async(req,res)=>{
    try{
        const user = await deleteUserService(req.params.id);

        res.json({
            message: "User deleted",
            user,
        });
    } catch(error){
        res.status(404).json({
            message: error.message,
        });
    }
};

module.exports = {
    register, 
    login,
    users,
    updateUser,
    deleteUser,
}