const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
app.use(bodyParser.json());

// Lista de usuários autorizados com seus respectivos e-mails e senhas
const usuariosAutorizados = [
    { email: "rafael.rocha.off@gmail.com", senha: "senha123" },
    { email: "joao.studioj@gmail.com", senha: "6Vrc5u3m" },
    { email: "isaiasrodrigues09@hotmail.com", senha: "v86Qx45x" },
    { email: "gustavogil00@hotmail.com", senha: "Uc6JA5mV" },
    { email: "neimar.assis@gmail.com", senha: "DkpmIOaA" },
    { email: "robsoncg@gmail.com", senha: "c2I737TP" },
    { email: "sirlenehp@gmail.com", senha: "sU5ki3E1" },
    { email: "bruno.ortt@gmail.com", senha: "ac5teqsN" },
    { email: "mahatmashow@gmail.com", senha: "in6C6tk4" },
    { email: "nessralla@gmail.com", senha: "SzUR03mQ" },
    { email: "luz97.luiz@gmail.com", senha: "BV4IVImP" },
    { email: "wow.bnribeiro@gmail.com", senha: "F9V7ylcV" },
    { email: "evy_andrade@hotmail.com", senha: "XxzoLpv1" },
    { email: "thiago.fq@gmail.com", senha: "OE4dleZ0" },
    { email: "maickmileppebrasil1991@gmail.com", senha: "pzgg8EIY" },
    { email: "machado7money@gmail.com", senha: "dgHD6Dxk" },
    { email: "julianafaoro0708@gmail.com", senha: "JO1UIWQJ" },
    { email: "marcosvnsousa26@gmail.com", senha: "HNCa2hzK" },
    { email: "erikaozawag@gmail.com", senha: "vn9NMA2O" },
    { email: "gl.francelino@hotmail.com", senha: "NET147HI" },
    { email: "cunha-l@hotmail.com", senha: "uj6SEmfF" },
    { email: "multsiqueira@gmail.com", senha: "7bq7t5tW" },
    { email: "thugloko69@gmail.com", senha: "E3cl1LYu" },
    { email: "wanegonmc@gmail.com", senha: "pUon2ybG" },
    { email: "adriano.pbi.rs@gmail.com", senha: "l2sWwIBc" },
    { email: "r.oliva.carvajal@gmail.com", senha: "pvnz8rju" },
    { email: "djwillce@gmail.com", senha: "41zBjeJo" },
    { email: "joao.simao.simon@gmail.com", senha: "5f1nURdk" },
    { email: "usuario2@gmail.com", senha: "abc456" },
    { email: "usuario3@gmail.com", senha: "xyz789" }
];

// Link da reunião do Zoom (oculto)
const linkZoom = "https://us06web.zoom.us/j/83620817355";

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

// Configuração do WebSocket
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
    const email = req.url.slice(1); // Obtém o e-mail da URL

    // Quando o cliente se conecta, adiciona o e-mail à lista de sessões ativas
    sessoesAtivas.add(email);

    // Quando o cliente desconecta, remove o e-mail da lista de sessões ativas
    ws.on('close', () => {
        sessoesAtivas.delete(email);
        console.log(`E-mail ${email} foi removido da lista de sessões ativas.`);
    });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
