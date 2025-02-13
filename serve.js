const express = require('express');
const database = require("./database");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Dados de exemplo para gastos
let gastos = [];

// usando o EJS
app.set('view engine','ejs');
app.use(express.static('public'));

// bodyParser
app.use(bodyParser.urlencoded({exetnd: false}))
app.use(bodyParser.json());

app.get("/login",(_,res) => {
    res.render("login");
})

app.get("/",(_,res) => {
    res.render("web");
})

app.get("/planejamento",(req,res) => {
    res.render("planejamento");
})

app.get("/cadastro",(_,res) => {
    res.render("cadastro");
})

app.get("/guarda",(req,res) => {
    res.render("guarda");
})


app.post("/autenticar",(req,res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    database.select().where({email: email,senha: senha}).table("usuarios").then(user => {
        if(user[0] != undefined){
            res.redirect("/");
        }else{
            res.send("E-mail ou senha errado");
        }
    }).catch(() => {
        res.redirect("/login");
    })
})

app.post("/criarLogin",(req,res) => {
    const dados = {
        nome: req.body.nome,
        senha: req.body.senha,
        email: req.body.email
    }

    database.select().where({email: dados.email}).table("usuarios").then(user => {
        user = user[0]

        if(user == undefined){
            database.insert(dados).into("usuarios").then(() => {
                res.redirect("/login");
            })
        }else{
            res.send("E-mail já foi usado");
        }
    })
})

// Rota para salvar um novo gasto
app.post('/adicionar-gasto', (req, res) => {
    const { descricao, valor, categoria } = req.body;
    const novoGasto = { descricao, valor: parseFloat(valor), categoria };
    gastos.push(novoGasto);
    res.json({ message: 'Gasto adicionado com sucesso!', gasto: novoGasto });
});

// Rota para retornar os gastos
app.get('/gastos', (req, res) => {
    res.json(gastos);
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
