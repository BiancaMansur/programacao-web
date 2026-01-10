const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuarioRepository = require('../repositories/UsuarioRepository');

const SECRET = 'sua_chave_secreta_aqui'; // Mesma chave usada no middleware

class AuthController {
    // Registro de novos usuários
    async registrar(req, res) {
        try {
            const { username, password } = req.body;
            // Criptografa a senha com salt de 10
            const hashedPassword = await bcrypt.hash(password, 10);
            await UsuarioRepository.create({ 
                username, 
                password: hashedPassword 
            });
            res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
        } catch (error) {
            res.status(400).json({ erro: "Erro ao registrar usuário. Nome pode já existir." });
        }
    }
    // Login e geração de Token
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const usuario = await UsuarioRepository.findByUsername(username);
            if (!usuario) {
                return res.status(401).json({ erro: "Usuário ou senha inválidos" });
            }
            // Compara a senha enviada com a do banco
            const senhaValida = await bcrypt.compare(password, usuario.password);
            if (!senhaValida) {
                return res.status(401).json({ erro: "Usuário ou senha inválidos" });
            }
            // Gera o token com o ID do usuário (expira em 24h)
            const token = jwt.sign({ id: usuario.id }, SECRET, { expiresIn: '1d' });
            res.json({ auth: true, token });
        } catch (error) {
            res.status(500).json({ erro: "Erro interno no servidor" });
        }
    }
}

module.exports = new AuthController();