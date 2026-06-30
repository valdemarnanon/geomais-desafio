const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, '../../db-empty.json')

function readDatabase () {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'))
}

function writeDatabase (data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

exports.findAll = (req, res) => {
    const { pessoas } = readDatabase()

    res.json(pessoas)
}


exports.findById = (req, res) => {
    const { pessoas } = readDatabase()

    const id = Number(req.params.id)

    const pessoa = pessoas.find(p => p.id === id)
    if (!pessoa) {
        return res.status(404).json({ message: 'Pessoa não encontrada' })
    }

    res.json(pessoa)
}

exports.create = (req, res) => {
    const db = readDatabase()
    const { pessoas } = db

    const novaPessoa = {
        id: Date.now(),
        ...req.body
    }

    const cpfExiste = pessoas.some(pessoa => pessoa.cpf === novaPessoa.cpf)
    const rgExiste = pessoas.some(pessoa => pessoa.rg === novaPessoa.rg)

    if (cpfExiste) {
        return res.status(409).json({
            success: false,
            message: 'CPF ja cadastrado.'
        })
    }

    if (rgExiste) {
        return res.status(409).json({
            success: false,
            message: 'RG ja cadastrado.'
        })
    }

    db.pessoas.push(novaPessoa)

    writeDatabase(db)

    res.status(201).json(novaPessoa)
}

exports.update = (req, res) => {
    const db = readDatabase()

    const id = Number(req.params.id)

    const pessoaIndex = db.pessoas.findIndex(pessoa => pessoa.id === id)

    if (pessoaIndex === -1) {
        return res.status(404).json({
            message: 'Pessoa não encontrada'
        })
    }

    db.pessoas[pessoaIndex] = {
        ...db.pessoas[pessoaIndex],
        ...req.body,
        id
    }

    writeDatabase(db)

    res.json(db.pessoas[pessoaIndex])
}

exports.remove = (req, res) => {
    const db = readDatabase()

    const id = Number(req.params.id)

    const pessoaExiste = db.pessoas.some(pessoa => pessoa.id === id)

    if (!pessoaExiste) {
        return res.status(404).json({
            message: 'Pessoa não encontrada'
        })
    }

    db.pessoas = db.pessoas.filter(pessoa => pessoa.id !== id)

    writeDatabase(db)

    res.status(204).send()
}
