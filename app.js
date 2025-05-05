const express = require('express');
const app = express();
const PORT =  3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/', (req, res) => {
    res.json(usuarios)
});

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: req.body.nombre,
      edad: req.body.edad,
      lugarProcedencia: req.body.lugarProcedencia
    };
    usuarios.push(nuevoUsuario)
    res.redirect('/');
})

app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuario = usuarios.find(usuario => usuario.nombre === nombre);

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const index = usuarios.findIndex(usuario => usuario.nombre === nombre);

    if (index === -1) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (req.body.edad) {
        usuarios[index].edad = req.body.edad;
    }
    if (req.body.lugarProcedencia) {
        usuarios[index].lugarProcedencia = req.body.lugarProcedencia;
    }

    res.json({ mensaje: 'Usuario actualizado', usuario: usuarios[index] });
});

app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const existe = usuarios.find(usuario => usuario.nombre === nombre);

    if (!existe) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuarios = usuarios.filter(u => u.nombre !== nombre);
    res.json({ mensaje: `Usuario ${nombre} eliminado` });
});

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});
