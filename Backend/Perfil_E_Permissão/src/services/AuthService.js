const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/db'); // Seu arquivo de conexão Knex

const SECRET = 'sua_chave_secreta_aqui'; // Em produção, use variáveis de ambiente (.env)

class AuthService {
    async registrar(username, password) {
        // Criptografa a senha antes de salvar (Segurança básica)
        const hashedPassword = await bcrypt.hash(password, 10);
        return db('usuarios').insert({ username, password: hashedPassword });
    }
    async login(username, password) {
        const usuario = await db('usuarios').where({ username }).first();
        if (!usuario) throw new Error("Usuário não encontrado");
        // Compara a senha digitada com a criptografada no banco
        const senhaValida = await bcrypt.compare(password, usuario.password);
        if (!senhaValida) throw new Error("Senha inválida");
        // Gera o Token JWT válido por 1 hora
        const token = jwt.sign({ id: usuario.id, nome: usuario.username }, SECRET, { expiresIn: '1h' });
        return token;
    }
}

module.exports = new AuthService();