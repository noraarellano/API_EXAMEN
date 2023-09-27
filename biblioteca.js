const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
app.use(express.json())

//Arreglo de objeto de libros
let libros = [
    {id:1, titulo:"Cien años de soledad", autor:"Gabriel García Márquez", genero:"Novela", disponibilidad:"0"},
    {id:2, titulo:"El señor de los anillos", autor:"J. R. R. Tolkien", genero:"Fantasía", disponibilidad:"1"},
    {id:3, titulo:"1984", autor:"George Orwell", genero:"Novela distópica", disponibilidad:"1"},
    {id:4, titulo:"Un mundo feliz", autor:"Aldous Huxley", genero:"Novela distópica", disponibilidad:"0"},
    {id:5, titulo:"Orgullo y prejuicio", autor:"Jane Austen", genero:"Novela", disponibilidad:"1"},
    {id:6, titulo:"Crimen y castigo", autor:"Fiódor Dostoyevski", genero:"Novela", disponibilidad:"0"},
    {id:7, titulo:"Lolita", autor:"Vladimir Nabokov", genero:"Novela", disponibilidad:"1"},
    {id:8, titulo:"Ulises", autor:"James Joyce", genero:"Novela experimental", disponibilidad:"1"},
    {id:9, titulo:"Madame Bovary", autor:"Gustave Flaubert", genero:"Novela", disponibilidad:"0"},
    {id:10, titulo:"En busca del tiempo perdido", autor:"Marcel Proust", genero:"Novela", disponibilidad:"1"}
];

//GET - Lista de todos los libros
app.get('/socios/v1/libros', (req,res) => {
   if(libros.length>0){
    res.status(200).json({
        estado:1,
        mensaje:"Hay libros en existencia",
        libros:libros
    })
   }else{
    res.status(404).json({
        estado:0,
        mensaje:"No existen libros",
        libros: libros
    })
   }
});

//GET - libro por su ID
app.get('/socios/v1/libros/:id', (req,res) => {
    //Solo una categoria
    const id = req.params.id;
    //Programación Funcional
    const libro = libros.find(libro=>libro.id==id)
    //Si se encontró una categoría
    if(libro){
        res.status(200).json({
            estado:1,
            mensaje:"Libro encontrado",
            libro:libro
        })
    }else{
        //No se encontró una categoría
        res.status(404).json({
            estado:0,
            mensaje:"No se encontró el libro",
            libro:{}
        })  
    }
    //Programación Estructurada
    for(let i = 0; i < array.length; i++){
        const element = array[i];
    }
});

//POST - Agregar libro
app.post('/socios/v1/libros', (req,res) => {
    const{titulo, autor, genero, disponibilidad} = req.body;
    const id = Math.round(Math.random()*1000);
    //Comprobar que el cliente(navegador) = usuario = programador
    if(titulo==undefined || autor==undefined || genero==undefined || disponibilidad==undefined){
        //Hay un error en la solicitud por parte del usuario
        res.status(400).json({
            estado:0,
            mensaje:"BAD REQUEST - Favor de llenar los campos correctamente"
        })
    }else{
        //En javascript como agregar un nuevo lemento a un arreglo
        const libro = {id:id, titulo:titulo, autor:autor, genero:genero, disponibilidad:disponibilidad};
        const longitudInicial = libros.length;
        libros.push(libro)
        if(libros.length > longitudInicial){
            //Si se agregó una categoría todo OK
            res.status(201).json({
                estado:1,
                mensaje:"Libro agregado",
                libro:libro
            })
        }else{
            //Error del servidor al no poder crearse la categoria
            res.status(500).json({
                estado:0,
                mensaje:"Libro no agregado por un error desconocido",
                libro:libro
            })
        }
    }
    res.send('Libro agregado correctamente');
});

//PUT - Actualizar libro por su ID
app.put('/socios/v1/libros/:id', (req,res) => {
    //Actualizar un recurso - Actualizar un libro
    const {id} = req.params;
    const {titulo, autor, genero, disponibilidad} = req.body;
    if(titulo==undefined || autor==undefined || genero==undefined || disponibilidad==undefined)
    {
        res.status(400).json({
            estado:0,
            mensaje:"Faltan parametros en la solicitud"
        })
    }
    else
    {
        const posActualizar = libros.findIndex(libro => libro.id==id)
        if(posActualizar!= -1)
        {
            //Si encontro la categoria con el id buscado
            //Actualizar la categoria
            libros[posActualizar].titulo=titulo;
            libros[posActualizar].autor=autor;
            libros[posActualizar].genero=genero;
            libros[posActualizar].disponibilidad=disponibilidad;
            res.status(200).json({
                estado: 1,
                mensaje: "Libro actualizado",
                libro: libros[posActualizar]
            })            
        }
        else
        {
            //No se encontro la categoria del id buscado
            res.status(404).json({
                estado:0,
                mensaje:"Libro no encontrado"
            })
        }
    }

    res.send('Libro actualizado correctamente');
});

//DELETE - Eliminar libro por su ID
app.delete('/socios/v1/libros/:id', (req,res) => {
    const {id} = req.params;
    const indiceEliminar = libros.findIndex(libro => libro.id==id)
    if(indiceEliminar!=-1){
        //Borrar la categoria
        libros.splice(indiceEliminar, 1);
        res.status(201).json({
            estado:1,
            mensaje:"Libro eliminado con éxito"
        })
    }else{
        //Categoria no encontrada
        res.status(404).json({
            estado:0,
            mensaje:"Libro no encontrado"
        })
    }

    //El id viene en los params de la solicitud
    res.send('Libro eliminado correctamente');
});

//Poner en marcha la API
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto: ', port);
});