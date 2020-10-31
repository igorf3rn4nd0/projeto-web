const express = require('express')
const app = express()
const port = process.env.PORT || 8081
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://adm:shYYt4fx3O31KheE@mymoviescluster.rgdld.mongodb.net/my-movies?retryWrites=true&w=majority'
app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
    extended: true
}))

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('my-movies')
    app.listen(port, () => console.log(`Listening on port ${port}`))
})


app.post('/api/login', (req, res) => {
    console.log('req : ', req.body)
    res.send({ mensagem: 'Bem vindo!' })
})

app.post('/api/cadastrar-usuario', (req, res) => {
    console.log('req : ', req.body)
    db.collection('usuario').save(req.body, (err, result) => {
        if (err) throw new Error('Erro ao salvar coleção')
        console.log('salvou no banco de dados!')
    })
})
