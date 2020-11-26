const express = require('express');
const router = express.Router();
const Subscriber = require('../models/candidato');

// GET all
router.get('/', async (req, res) => {
  try {
    const candidatos = await Candidato.find();

    return res.send(candidatos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET by ID
router.get('/:id', getCandidatos, async (req, res) => {
  res.json(res.candidato);
});

// POST create
router.post('/', async (req, res) => {
  const candidato = new Candidato({
    nome: req.body.nome,
    partido: req.body.partido,
    numero: req.body.numero,
    votos: req.body.votos,
    status: req.body.status,
  });

  try {
    const created = await candidato.save();

    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update
router.patch('/:id', getCandidato, async (req, res) => {
  if (req.body.nome != null) {
    res.candidato.nome = req.body.nome;
  }

  if (req.body.partido != null) {
    res.candidato.partido = req.body.partido;
  }

  if (req.body.votos != null) {
    res.candidato.votos = req.body.votos;
  }

  if (req.body.status != null) {
    res.candidato.status = req.body.status;
  }

  try {
    const updated = await res.candidato.save();

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE remove
router.delete('/:id', getCandidato, async (req, res) => {
  try {
    await res.candidato.remove();

    res.json({ message: 'Deleted Successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware
async function getCandidato(req, res, next) {
  try {
    candidato = await Candidato.findById(req.params.id);

    if (candidato == null) {
      return res.status(404).json({ message: 'Candidato not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.candidato = candidato;

  next();
}

// export
module.exports = router;
