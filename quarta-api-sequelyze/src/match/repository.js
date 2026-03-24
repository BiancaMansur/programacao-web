const Match = require('./models');

class MatchRepository {
    async findMatches(usuario_id) {
        const { Op } = require('sequelize');
        return await Match.findAll({
            where: {
                [Op.or]: [{ usuario_1: usuario_id }, { usuario_2: usuario_id }]
            },
            include: ['user1', 'user2']
        });
    }
}
module.exports = new MatchRepository();