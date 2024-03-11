const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router();

ruta.get('/', (req, res) => {
    let resultado = listarCursosActivos();
    resultado.then(cursos => {
        res.json(cursos);
    }).catch(err => {
        res.status(400).json(err);
    })
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

//Endpoint de tipo Put para el rescurso Cursos 
ruta.put('/:id', (req, res) => {
    let resultado = actualizarCurso(req.params.id, req.body);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err)
    })
});


//Endpoint de tipo DELETE para el recurso CURSOS
ruta.delete('/:id', (req, res) => {
    let resultado = desactivarCurso(req.params.id);
    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    })
})


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


// Funcion asincrona para actualizar cursos
async function actualizarCurso(id, body){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    }, {new: true});
    return curso;
}


//Funcion Asincrona para inectivar cursos
async function desactivarCurso(id){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, {new: true});
    return curso;
}

// Funcion asincrona  para listar los cursos activos 
async function listarCursosActivos(){
    let cursos = await Curso.find({"estado": true});
    return cursos;
}
module.exports = ruta;
