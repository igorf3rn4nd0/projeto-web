const { v4: uuidv4 } = require('uuid')
const express = require('express')
const app = express()
const port = process.env.PORT || 8081
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://adm:shYYt4fx3O31KheE@mymoviescluster.rgdld.mongodb.net/my-movies?retryWrites=true&w=majority'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('my-movies')
    app.listen(port, () => console.log(`Listening on port ${port}`))
})


app.post('/api/login', (req, res, next) => {
    const query = req.body
    db.collection('usuario').find(query).toArray(function(err, result) {
        if (err) res.status(500).send('Erro ao se conectar com a base de dados!')
        if (result && result.length > 0) {
            res.send({ ...result[0], token: uuidv4() })
        } else {
            res.status(500).send('Usuário ou senha incorretos!')
        }
    })
})

app.post('/api/buscar-filme', (req, res, next) => {
    const tags = req.body.tags
    console.log('req.body.tags: ', req.body.tags)
    db.collection('filme').find({"tags": { $in: tags }}).toArray(function(err, result) {
        if (err) res.status(500).send('Erro ao buscar informações do filme!')
        console.log('result: ', result)
        if (result && result.length > 0) {
            res.send({ ...result[0] })
        } else {
            res.send({})
        }
    })
})

app.post('/api/listar-filmes', (req, res, next) => {
    const query = req.body
    db.collection('filme').find(query).toArray(function(err, result) {
        if (err) res.status(500).send('Erro ao buscar a lisa de filmes!')
        if (result && result.length > 0) {
            res.send({ ...result })
        } else {
            res.send([])
        }
    })
})

app.post('/api/cadastrar-usuario', (req, res, next) => {
    db.collection('usuario').find({ email: req.body.email }).toArray(function(err, result) {
        if (err) return res.status(500).send('Erro ao salvar os dados!')
        if (result && result.length > 0) {
            res.status(500).send('E-mail já cadastrado!')
        } else {
            db.collection('usuario').insertOne({ ...req.body, _id: uuidv4() }).then((result) => {
                res.send({ ...result, token: uuidv4() })
            }).catch(() => {
                console.log('error')
                res.status(500).send('Erro ao salvar os dados!')
            })
        }
    })
})
