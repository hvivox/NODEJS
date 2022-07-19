
const express = require('express'); //importa o express
const { MongoClient, ObjectId } = require('mongodb');
const app = express(); // executa o expressa
const url = "mongodb://localhost:27017";
const dbName = "herois"
//const fetch = require("node-fetch");


async function main() {



  //conexão com o mongo
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("herois");
  console.log("conectando com o banco de dados");

  app.use(express.json());



  // ROTA FUNCTION(RESICICAO, RESPOSTA)
  app.get('/', function (req, res) {
    res.send('<h1>Hello World.. </h1>')
  });


  app.get('/oi', function (req, res) {
    res.send('<h1>Olá, mundo.. </h1>')
  });

  // ------------------------------------------------
  // HEROI
  const herois = ["Batman", "Super Man", "Back CameRiden"];
  // [GET] READ ALL
  app.get('/herois', async function (req, res) {
    const documentos = await collection.find().toArray();
    res.send(documentos);
    //res.send(herois.filter(Boolean));
    //res.send(herois)
    // res.send('<h1>Olá, mundo.. </h1>')
  });


  //[GET] READ BY ID
  app.get('/herois/:id', async function (req, res) {
    //const item = req.body.nome;
    const id = req.params.id;

    const item = await collection.findOne({ _id: new ObjectId(id) });
    res.send(item);
    /*const item = herois[id - 1];
    res.send("ITEM CRIADO COM SUCESSO!!!" + item);*/
  });


  // [POST] CREATE
  app.post('/herois', async function (req, res) {
    /* const item = req.body.nome;
     herois.push(item);*/
    const item = req.body;
    //herois.push(item);
    await collection.insertOne(item);
    res.send(item);

  });




  //[UPDATE] ATUALIZA A LISTA
  app.put('/herois/:id', function (req, res) {
    //const item = req.body.nome;
    const id = req.params.id;
    const item = req.body;

    collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: item, }
    );
    //herois[id - 1] = item;

    res.send(item);
  });





  //[DELETE] DELTE ITEM
  app.delete('/herois/:id', async function (req, res) {
    const id = req.params.id;

    //delete herois[id - 1];
    await collection.deleteOne({ _id: new ObjectId(id) });
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


  app.listen(3000, function () {
    console.log("APLICAÇÃO RODANDOS EM http://localhost:300");
  });


}


main();