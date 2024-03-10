const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router();

ruta.get('/', (req, res) => {
    res.json('Respuesta a peticion GET de USUARIOS funcionando correctamente...')
});



//ENdpointde tipo POST  para el recurso Cursos 
ruta.post('/', (req, res) =>{
    let resultado = crearCurso(req.body);

    resultado.then(curso => {
        res.json({
            curso
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
});

// Funcion asincrona para crear cursos 
async function crearCurso(body){
    let curso = new Curso({
        titulo : body.titulo,
        descripcion  : body.descripcion,
        alumnos : body.alumnos,
        calificacion : body.calificacion
    });
    return await curso.save();
}


module.exports = ruta;