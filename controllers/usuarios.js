const express = require('express');
const Usuario = require('../models/usuario_model');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    res.json('respuesta a la peticion GET de CURSOS correctamente...')
});


module.exports = ruta;