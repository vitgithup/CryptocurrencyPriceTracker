import express, { Application } from "express";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app: Application = express();
import cryptocurrenciesRoutes from "./routes/cryptocurrencies";


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

app.use("/cryptocurrencies", cryptocurrenciesRoutes);



//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));