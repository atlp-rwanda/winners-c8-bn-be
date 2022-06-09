import users from "../database/models/User"

exports.createOne = async (req, res, next) => {
    try {
        const USER_MODEL = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
            const user = await users.create(USER_MODEL)
            console.log("user created successfully")
            return res.status(200).json(user);  
    } catch (error) {
        return res.status(500).json(error);
    }
};