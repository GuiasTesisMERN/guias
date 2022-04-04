const { UserModel } = require('../User');

class UserRepository {
    async CreateUser({ nombres, apellidos, email, password }) {
        try {
            const user = new UserModel({
                nombres,
                apellidos,
                email,
                password
            });

            const userResult = await user.save();
            return userResult;
        } catch (err) {
            throw new Error('No se pudo crear el usuario');
        }
    }
}

module.exports = UserRepository;