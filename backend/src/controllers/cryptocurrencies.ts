import { RequestHandler } from "express";
import createHttpError from "http-errors";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const getCryptocurrencies: RequestHandler = async (req, res) => {

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
};

export const getCryptocurrency: RequestHandler = async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try {
        const cryptocurrency = await prisma.cryptocurrency.findUnique({
            where: {
                id: Number(cryptoId),
            },
        });
        if (!cryptocurrency) {
            throw createHttpError(404, "Cryptocurrency not found");
        }

        res.status(200).json(cryptocurrency);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

interface CreateCryptocurrencyBody {
    name: string,
    symbol: string,
    price: number,
}

export const createCryptocurrency: RequestHandler<unknown, unknown, CreateCryptocurrencyBody, unknown> = async (req, res) => {
    const name = req.body.name.trim();
    const symbol = req.body.symbol.trim();
    const price = req.body.price;
    
    try {
        if (!name) {
            throw createHttpError(400, "Cryptocurrency must have a name");
        }

        if (!symbol) {
            throw createHttpError(400, "Cryptocurrency must have a symbol");
        }
        
        const newCryptocurrency = await prisma.cryptocurrency.create({
            data: {
                name: name,
                symbol: symbol,
                price: price
            },
        });

        console.log("newCryptocurrency",newCryptocurrency)
        res.status(201).json(newCryptocurrency);

    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

interface UpdateCryptocurrencyParams {
    cryptoId: string,
}

interface UpdateCryptocurrencyBody {
    name: string,
    symbol: string,
    price?: number,
}

export const updateCryptocurrency: RequestHandler<UpdateCryptocurrencyParams, unknown, UpdateCryptocurrencyBody, unknown> = async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const newName = req.body.name.trim();
    const newSymbol = req.body.symbol.trim();
    const newPrice = req.body.price;

    try {


        if (!newName) {
            throw createHttpError(400, "Cryptocurrency must have a name");
        }

        if (!newSymbol) {
            throw createHttpError(400, "Cryptocurrency must have a symbol");
        }

        const cryptocurrency = await prisma.cryptocurrency.findUnique({
            where: {
                id: Number(cryptoId),
            },
        });

        if (!cryptocurrency) {
            throw createHttpError(404, "Cryptocurrency not found");
        }

        const Updatecryptocurrency = await prisma.cryptocurrency.update({
            where: {
                id: Number(cryptoId),
            },
            data: {
                name: newName,
                symbol: newSymbol,
                price: newPrice
            },
        });
        res.status(200).json(Updatecryptocurrency);

    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deleteCryptocurrency: RequestHandler = async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try {

        const cryptocurrency = await prisma.cryptocurrency.findUnique({
            where: {
                id: Number(cryptoId),
            },
        });

        if (!cryptocurrency) {
            throw createHttpError(404, "Cryptocurrency not found");
        }

        const cryptocurrencyRemove = await prisma.cryptocurrency.delete({
            where: {
                id: Number(cryptoId),
            },
        });

        res.status(204).json(cryptocurrencyRemove);
    } catch (error) {
       res.status(500).json({ message: (error as Error).message });
    }
};


