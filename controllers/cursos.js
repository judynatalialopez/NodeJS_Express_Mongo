const express = require('express');
const logic = require('../logic/curso_logic');
const ruta = express.Router();

//Enpoint de tipo Get para el recurso Cursos
ruta.get('/', (req, res) => {
    let resultado = logic.listarCursosActivos();
    resultado.then(cursos => {
        res.json(cursos);
    }).catch(err => {
        res.status(400).json(err);
    })
});

//ENdpointde tipo POST  para el recurso Cursos 
ruta.post('/', (req, res) =>{
    let resultado = logic.crearCurso(req.body);

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
    let resultado = logic.actualizarCurso(req.params.id, req.body);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err)
    })
});


//Endpoint de tipo DELETE para el recurso CURSOS
ruta.delete('/:id', (req, res) => {
    let resultado = logic.desactivarCurso(req.params.id);
    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    })
})

module.exports = ruta;
