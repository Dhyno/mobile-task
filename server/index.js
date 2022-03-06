const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

const { toDo } = require('./models/index')

app.post("/todo", async ( req, res )=>{
    await toDo.create(req.body)
        .then( response => res.status(200).send({message: "success"}) )
        .catch( err => {
            console.log(err);
            res.status(500).send({message: "server error"})
        })
})

app.get("/todo/:id", async ( req, res )=>{
    await toDo.findOne({where: {id: req.params.id}})
        .then( response => res.status(200).send({message: "success", result: response}) )
        .catch( err => {
            console.log(err);
            res.status(500).send({message: "server error"})
        })
})

app.get("/todo", async ( req, res )=>{
    await toDo.findAll()
        .then( response => res.status(200).send({message: "success", result: response}) )
        .catch( err => {
            console.log(err);
            res.status(500).send({message: "server error"})
        })
})

app.patch("/todo/:id", async ( req, res )=>{
    await toDo.update(req.body , { where: { id: req.params.id } } )
        .then( response => res.status(200).send({message: "success"}) )
        .catch( err => {
            console.log(err);
            res.status(500).send({message: "server error"})
        })
})

app.delete("/todo/:id", async ( req, res )=>{
    await toDo.destroy({ where: { id: req.params.id } } )
        .then( response => res.status(200).send({message: "success"}) )
        .catch( err => {
            console.log(err);
            res.status(500).send({message: "server error"})
        })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))