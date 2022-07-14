
const express = require('express'); //importa o express
const app = express(); // executa o expressa
//const fetch = require("node-fetch");

app.use( express.json() );

// ROTA FUNCTION(RESICICAO, RESPOSTA)
app.get('/', function (req, res) {
  res.send('<h1>Hello World.. </h1>')
});


app.get('/oi', function (req, res) {
    res.send('<h1>Olá, mundo.. </h1>')
  });
  
// ------------------------------------------------
  // HEROI
const herois = [ "Batman", "Super Man", "Back CameRiden" ];
// [GET] READ ALL
  app.get('/herois', function (req, res) {
    
    res.send(herois.filter( Boolean) );
    //res.send(herois)
    // res.send('<h1>Olá, mundo.. </h1>')
  });


//[GET] READ BY ID
app.get('/herois/:id', function (req, res) {   
  //const item = req.body.nome;
  const id = req.params.id;
  const item = herois[id -1];
  res.send("ITEM CRIADO COM SUCESSO!!!" + item);  
});


// [POST] CREATE
  app.post('/herois', function (req, res) {   
    const item = req.body.nome;
    herois.push( item );
    //console.log(req.body);
    //console.log(req.body.nome);
    res.send("ITEM CRIADO !!!");
    
  });




//[UPDATE] ATUALIZA A LISTA
app.put('/herois/:id', function (req, res) {   
  //const item = req.body.nome;
  const id = req.params.id;
  const item = req.body.nome;
  herois[id - 1] =item;

  res.send("ITEM ATUALIZADOO!!!" + item);  
});

//[DELETE] DELTE ITEM
app.delete('/herois/:id', function (req, res) {   
  const id = req.params.id;
   
  delete herois[id - 1];

  res.send("ITEM DELETADO!!!");  
});



  //POCKEMON
  app.get('/pockemon', function (req, res) {
    // https://pokeapi.co/api/v2/pokemon
   let pockemon; 
    fetch("https://pokeapi.co/api/v2/pokemon")
        .then((response) => response.json())
        .then((json) => {
          pockemon = json;
        });
    
    res.send(pockemon)
    // res.send('<h1>Olá, mundo.. </h1>')
  });

  
app.listen(3000, function(){
    console.log(  "APLICAÇÃO RODANDOS EM http://localhost:300");
});
