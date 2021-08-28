import express, { response } from 'express';

const app = express();

const PORT = process.env.PORT || 3333;

app.get('/', () => {
  return response.json({message: 'Hello world'});
});

app.listen(PORT, () => console.log(`Server is running at por ${PORT}`))