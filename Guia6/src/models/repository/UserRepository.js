const { UserModel } = require('../User');

class UserRepository {
    async CreateUser({ nombres, apellidos, email, password }) {
        const user = new UserModel({
            nombres,
            apellidos,
            email,
            password
        });

        const userResult = await user.save();
        return userResult;
    }

    async FindUserByEmailAndPassword(user) {
        const userData = await UserModel.findOne({
            email: user.email,
            password: user.password
        });

        return userData;
    }
}

module.exports = UserRepository;