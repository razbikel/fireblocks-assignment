const { getUsers, addResevationToUser } = require('../../models/users.model')


const httpGetUsers = async (req, res) => {
    // await addResevationToUser(1, "03-06-2022", 5)
    const users = getUsers();
    return res.status(200).json(users);
}


module.exports = {
    httpGetUsers
};