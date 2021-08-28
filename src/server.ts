import express from 'express';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3333;

app.get('/', (request, response) => {
  const { name } = request.query;
  return response.json({ message: name });
});

app.listen(PORT, () => console.log(`Server is running at por ${PORT}`));
