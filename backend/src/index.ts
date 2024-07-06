import express, { Application } from "express";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app: Application = express();

//json
app.use(express.json());

//cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//test api
app.get('/test', (req, res) => {
  try {
    res.status(200).json({ message: 'TS-API is working!!' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

//get all cryptocurrencies
app.get('/cryptocurrencies', async (req, res) => {
  try {
    const cryptocurrencies = await prisma.cryptocurrency.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
    res.status(200).json(cryptocurrencies);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

//get cryptocurrency by id
app.get('/cryptocurrencies/:id', async (req, res) => {
  try {
    const cryptocurrency = await prisma.cryptocurrency.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(cryptocurrency);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

//create cryptocurrencies
app.post('/cryptocurrencies', async (req, res) => {
  try {
    const cryptocurrency = await prisma.cryptocurrency.create({
      data: {
        name: req.body.name.trim(),
        symbol: req.body.symbol.trim(),
        price: req.body.price
      },
    });
    res.status(201).json(cryptocurrency);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

//update cryptocurrencies
app.put('/cryptocurrencies/:id', async (req, res) => {
  try {
    const cryptocurrency = await prisma.cryptocurrency.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name.trim(),
        symbol: req.body.symbol.trim(),
        price: req.body.price
      },
    });
    res.status(200).json(cryptocurrency);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

//delete cryptocurrencies
app.delete('/cryptocurrencies/:id', async (req, res) => {
  try {
    const cryptocurrency = await prisma.cryptocurrency.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(cryptocurrency);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));