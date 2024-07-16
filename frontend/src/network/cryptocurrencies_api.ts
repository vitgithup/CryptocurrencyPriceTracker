import { Cryptocurrency } from "@/interfaces/Cryptocurrency";




async function fetchData(input: RequestInfo, init?: RequestInit) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const response = await fetch(apiUrl+input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
    }
}


export async function fetchCryptocurrencies(): Promise<Cryptocurrency[]> {
    const response = await fetchData("/cryptocurrencies", { method: "GET" });
    return response.json();
}


export interface CryptocurrencyInput {
    name: string;
    symbol: string;
    price?: number;
}

export async function createCryptocurrency(cryptocurrency: CryptocurrencyInput): Promise<Cryptocurrency> {
    const response = await fetchData("/cryptocurrencies",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cryptocurrency),
        });
    return response.json();
}

export async function updateCryptocurrency(cryptoId: number, cryptocurrency: CryptocurrencyInput): Promise<Cryptocurrency> {
    const response = await fetchData("/cryptocurrencies/" + cryptoId,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cryptocurrency),
        });
    return response.json();
}


export async function deleteCryptocurrency(cryptoId: number) {
    await fetchData("/cryptocurrencies/" + cryptoId, { method: "DELETE" });
}