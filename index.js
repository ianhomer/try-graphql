import express from 'express'

const app = express();

app.get('/', (req, res) => {
  res.send('GraphQL is OK');
})

app.listen(8080, () =>  console.log('Running server'));
