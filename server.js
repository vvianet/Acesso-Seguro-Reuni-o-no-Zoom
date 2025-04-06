const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Lista de usuários autorizados com seus respectivos e-mails e senhas
const usuariosAutorizados = [
    { email: "rafael.rocha.off@gmail.com", senha: "senha123" },
    { email: "joao.studioj@gmail.com", senha: "abc456" },
    { email: "isaiasrodrigues09@hotmail.com", senha: "abc456" },
    { email: "gustavogil00@hotmail.com", senha: "abc456" },
    { email: "neimar.assis@gmail.com", senha: "abc456" },
    { email: "robsoncg@gmail.com", senha: "abc456" },
    { email: "sirlenehp@gmail.com", senha: "abc456" },
    { email: "bruno.ortt@gmail.com", senha: "abc456" },
    { email: "mahatmashow@gmail.com", senha: "abc456" },
    { email: "nessralla@gmail.com", senha: "abc456" },
    { email: "luz97.luiz@gmail.com", senha: "abc456" },
    { email: "wow.bnribeiro@gmail.com", senha: "abc456" },
    { email: "evy_andrade@hotmail.com", senha: "abc456" },
    { email: "thiago.fq@gmail.com", senha: "abc456" },
    { email: "maickmileppebrasil1991@gmail.com", senha: "abc456" },
    { email: "machado7money@gmail.com", senha: "abc456" },
    { email: "julianafaoro0708@gmail.com", senha: "abc456" },
    { email: "marcosvnsousa26@gmail.com", senha: "abc456" },
    { email: "erikaozawag@gmail.com", senha: "abc456" },
    { email: "gl.francelino@hotmail.com", senha: "abc456" },
    { email: "cunha-l@hotmail.com", senha: "abc456" },
    { email: "multsiqueira@gmail.com", senha: "abc456" },
    { email: "thugloko69@gmail.com", senha: "abc456" },
    { email: "wanegonmc@gmail.com", senha: "abc456" },
    { email: "adriano.pbi.rs@gmail.com", senha: "abc456" },
    { email: "r.oliva.carvajal@gmail.com", senha: "abc456" },
    { email: "usuario2@gmail.com", senha: "abc456" },
    { email: "usuario2@gmail.com", senha: "abc456" },
    { email: "usuario2@gmail.com", senha: "abc456" },
    { email: "usuario3@gmail.com", senha: "xyz789" }
];

// Link da reunião do Zoom (oculto)
const linkZoom = "https://us06web.zoom.us/j/88113615679";

// Armazenamento temporário de sessões ativas
const sessoesAtivas = new Set();

// Rota para login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Verifica se o e-mail e a senha correspondem a algum usuário autorizado
    const usuarioEncontrado = usuariosAutorizados.find(usuario => 
        usuario.email === email && usuario.senha === senha
    );

    if (!usuarioEncontrado) {
        return res.json({ success: false, message: "E-mail ou senha incorretos." });
    }

    // Verifica se o e-mail já está em uso
    if (sessoesAtivas.has(email)) {
        return res.json({ success: false, message: "Este e-mail já está em uso." });
    }

    // Adiciona o e-mail à lista de sessões ativas
    sessoesAtivas.add(email);

    // Retorna o link do Zoom
    res.json({ success: true, link: linkZoom });

    // Remove o e-mail da lista de sessões ativas após 1 hora (3600000 ms)
    setTimeout(() => {
        sessoesAtivas.delete(email);
    }, 3600000);
});

// Servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
