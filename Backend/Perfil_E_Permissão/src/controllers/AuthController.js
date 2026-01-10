const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/connection');

const SECRET = 'sua_chave_secreta_aqui';

class AuthController {
    // REGISTAR USUÁRIO
    async registrar(req, res) {
        try {
            const { username, password, perfil_id } = req.body;
            // Criptografa a senha
            const hashedPassword = await bcrypt.hash(password, 10);
            // Insere no banco (perfil_id deve ser 1 para admin ou 2 para aluno)
            await db('usuarios').insert({
                username,
                password: hashedPassword,
                perfil_id: perfil_id || 2 // Se não enviar, define como 'aluno' por padrão
            });
            res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(400).json({ erro: "Erro ao registrar. O utilizador pode já existir." });
        }
    }
    // LOGIN (COM JOIN PARA BUSCAR O PERFIL)
    async login(req, res) {
        try {
            const { username, password } = req.body;

            // Procura o utilizador e traz o nome do perfil associado
            const usuario = await db('usuarios')
                .join('perfis', 'usuarios.perfil_id', '=', 'perfis.id')
                .select('usuarios.*', 'perfis.nome as perfil_nome')
                .where({ username })
                .first();
            if (!usuario) {
                return res.status(401).json({ erro: "Utilizador ou senha inválidos" });
            }
            // Verifica a senha
            const senhaValida = await bcrypt.compare(password, usuario.password);
            if (!senhaValida) {
                return res.status(401).json({ erro: "Utilizador ou senha inválidos" });
            }
            // Gera o token incluindo o perfil
            const token = jwt.sign(
                { 
                    id: usuario.id, 
                    perfil: usuario.perfil_nome // Aqui vai 'admin' ou 'aluno'
                }, 
                SECRET, 
                { expiresIn: '1d' }
            );
            res.json({ auth: true, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro interno no servidor" });
        }
    }
}

module.exports = new AuthController();