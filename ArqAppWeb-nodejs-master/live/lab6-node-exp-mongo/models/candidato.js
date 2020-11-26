const mongoose = require('mongoose');

// definição do esquema
const candidatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  partido: {
    type: String,
    required: true,
  },
  numero: {
    type: Number,
    required: true,
  },
  votos: {
    type: Number,
    required: true,
  },
  status: {
    type: String, // ATIVO, INATIVO, SUSPENSO
    required: true,
  },
  criadoEm: {
    type: Date,
    required: true,
    default: Date.now,
  },
  atualizadoEm: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// configurando o esquema no banco
module.exports = mongoose.model('Candidato', candidatoSchema);
