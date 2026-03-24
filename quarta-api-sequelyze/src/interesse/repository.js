const Interesse = require('./models');

class InteresseRepository {
    async findAll() {
        return await Interesse.findAll();
    }
}
module.exports = new InteresseRepository();