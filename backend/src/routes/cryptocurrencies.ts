import express from "express";
import * as CryptocurrenciesController from "../controllers/cryptocurrencies";

const router = express.Router();

router.get("/", CryptocurrenciesController.getCryptocurrencies);

router.get("/:cryptoId", CryptocurrenciesController.getCryptocurrency);

router.post("/", CryptocurrenciesController.createCryptocurrency);

router.put("/:cryptoId", CryptocurrenciesController.updateCryptocurrency);

router.delete("/:cryptoId", CryptocurrenciesController.deleteCryptocurrency);

export default router;