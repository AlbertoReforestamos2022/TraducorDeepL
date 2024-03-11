const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const port = 9000;

// DeepL API 
const deepl = require('deepl-node')
const authKey = "10b047b0-b79e-9d5f-63b3-7e4291a3cc92:fx"; // Replace with your key
const translator = new deepl.Translator(authKey);


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Aviso privacidad
// app.post('/bolsa-trabajo', (req, res) =>{
//     console.log(req.body)
//     const { objTitVac, idiomaSelect } = req.body;
//     let notas = Object.entries(objTitVac); 
//     let traduccionNotas = {};         


//     const promesasTraduccion = notas.map(async (nota, key) => {
//     try {
//         const response = await translator.translateText(nota[1], null, idiomaSelect);
//         let indice = key;
//         let traduccion = response.text;
//         traduccionNotas[indice] = traduccion;

//     } catch (error) {
//         // Manejo de errores, puedes agregar el código necesario aquí
//         console.error('Error en la traducción:', error);
//     }
//     });
    
//     Promise.all(promesasTraduccion)
//     .then(() => {
//         console.log(traduccionNotas);
//         res.send(traduccionNotas);
//     })
//     .catch((error) => {
//         console.error('Error en una o más traducciones:', error);
//         res.status(500).send('Error en la traducción de notas');
//     });
  

// });

// Notas de blog 
app.post('/notas-blog', (req, res) => {
    console.log(req.body);
    const { objNotas, idiomaSelect } = req.body;
    
    let idioma = idiomaSelect;
    let contenido = objNotas.textNotas;

    (async () => {
        const result = await translator.translateText(`${contenido}`, null, `${idioma}`);
        let contenidoTraduccion = {};
    
        contenidoTraduccion.contenido = result.text;
    
        console.log(contenidoTraduccion);
        res.send(contenidoTraduccion);


    })();
    
})

app.get('/es', (req, res)=>{
    console.log(req.body)
    res.send('Soy get');
})


app.use((req, res)=> {
    res.status(404).send('No se encontró tu página')
})

app.listen(port, ()=>{
    console.log(`Server on port ${port}`);
})