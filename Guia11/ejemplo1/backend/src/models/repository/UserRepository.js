const { UserModel } = require('../User');

class UserRepository {
    async CreateUser(nombres, apellidos, email, password) {
        const user = new UserModel({
            nombres,
            apellidos,
            email,
            password
        });

        const userResult = await user.save();
        return userResult;
    }

    /**
     * @description Método para encontrar en el modelo de mongoose a un usuario por email y password
     * @param string email
     * @param string password
     */
    async FindUserByEmailAndPassword(email, password) {
        const userData = await UserModel.findOne({
            email: email,
            password: password
        });

        return userData;
    }
}

module.exports = UserRepository;