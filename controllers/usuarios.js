const express = require('express');
const ruta = express.Router();
const logic = require('../logic/usurio_logic');


//Endpoint de tipo GET para el recurso usurios. Lista todos los usuarios
ruta.get('/',(req, res) => {
    let resultado = logic.listarUsuarioActivos();
    resultado.then(usuarios =>{
        res.json(usuarios)
    }).catch(err => { 
        res.status(400).json(
            {
                err
            }
        )
    })
});

//Enpoint de tipo POST paraa el recurso USUARIOS
ruta.post('/', (req, res) => {
    let body = req.body;

    const { error, value } = logic.schema.validate({ nombre: body.nombre, email: body.email });
    if (!error) {
        let resultado = logic.crearUsuario(body);

        resultado.then(user => {
            res.json({
                valor: user
            })
        }).catch(err => {
            res.status(400).json({
                err
            })
        });
    } else {
        res.status(400).json({
            error
        })
    }
});

//Enpoint de tipo PUT para actualizar los datos del usuario
ruta.put('/:email', (req, res) => {
    const {error, value} = logic.schema.validate({ nombre: req.body.nombre});
    if(!error) {
        let resultado = logic.actualizarUsuario(req.params.email, req.body);
        resultado.then(valor => {
            res.json({
                valor
            })
        }).catch(err => {
            res.status(400).json({
                err
            })
        });
    } else {
        res.status(400).json({
            error
        })
    }
});

// Endpoint dde tipo DELETE para el recurso USUARIO
ruta.delete('/:email',  (req, res) => {
    let resultado = logic.desactivarUsuario(req.params.email);
    resultado.then(valor => {
        result.json({
            usuario: valor
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});


module.exports = ruta;