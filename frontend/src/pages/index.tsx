import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from '../components/CardComponent';
import exp from 'constants';
import { Cryptocurrency } from '../interfaces/Cryptocurrency';


export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([]);
  const [selectCryptocurrency, setSelectCryptocurrency] = useState<Cryptocurrency>({ id: 0, name: '', symbol: '', price: '' });

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/cryptocurrencies`);
      setCryptocurrencies(response.data.reverse());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //fetch cryptocurrencies
  useEffect(() => {
    fetchData();

    let timer;
    timer = setInterval(() => {
      const sec = new Date().getSeconds();
      if (sec) return
      fetchData();
    }, 500)

    return () => {
      clearInterval(timer)
    }


  }, []);





  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selectCryptocurrency.id) {
        await axios.put(`${apiUrl}/cryptocurrencies/${selectCryptocurrency.id}`, { name: selectCryptocurrency.name, symbol: selectCryptocurrency.symbol, price: selectCryptocurrency.price });

        setCryptocurrencies(
          cryptocurrencies.map((cryptocurrency) => {
            if (cryptocurrency.id === selectCryptocurrency.id) {
              return { ...cryptocurrency, name: selectCryptocurrency.name, symbol: selectCryptocurrency.symbol, price: selectCryptocurrency.price };
            }
            return cryptocurrency;
          })
        );
      } else {
        const response = await axios.post(`${apiUrl}/cryptocurrencies`, { name: selectCryptocurrency.name, symbol: selectCryptocurrency.symbol, price: selectCryptocurrency.price });
        setCryptocurrencies([response.data, ...cryptocurrencies]);
      }
      setSelectCryptocurrency({ id: 0, name: '', symbol: '', price: '' });
    } catch (error) {
      console.error('Error updating cryptocurrency:', error);
    }
  };

  //delete cryptocurrency
  const deleteItem = async (id: number) => {
    try {
      if (!id) {
        return;
      }
      await axios.delete(`${apiUrl}/cryptocurrencies/${id}`);
      setCryptocurrencies(cryptocurrencies.filter((cryptocurrency) => cryptocurrency.id !== id));
    } catch (error) {
      console.error('Error deleting cryptocurrency:', error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="space-y-4 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Cryptocurrency App</h1>


        {/* Update cryptocurrency */}
        <form onSubmit={handleSubmit} className="p-4 bg-green-100 rounded shadow">
          <input
            placeholder="ID"
            value={selectCryptocurrency.id != 0 ? selectCryptocurrency.id : ""}
            onChange={(e) => setSelectCryptocurrency({ ...selectCryptocurrency, id: Number(e.target.value) })}
            className="mb-2 w-full p-2 border border-gray-300 bg-gray-300 rounded" readOnly={true}
          />
          <input
            placeholder="Name"
            value={selectCryptocurrency.name}
            onChange={(e) => setSelectCryptocurrency({ ...selectCryptocurrency, name: e.target.value })}
            className="mb-2 w-full p-2 border border-gray-300 rounded" required
          />
          <input
            placeholder="Symbol"
            value={selectCryptocurrency.symbol}
            onChange={(e) => setSelectCryptocurrency({ ...selectCryptocurrency, symbol: e.target.value.toUpperCase() })}
            className="mb-2 w-full p-2 border border-gray-300 rounded" required
          />
          <input
            placeholder="Price"
            value={selectCryptocurrency.price}
            onChange={(e) => setSelectCryptocurrency({ ...selectCryptocurrency, price: e.target.value.toUpperCase() })}
            className="mb-2 w-full p-2 border border-gray-300 rounded" required
          />
          <div className='flex justify-around'>
            <button type="reset" className="w-[40%] p-2 text-white bg-blue-500 rounded hover:bg-blue-600" value="Reset"
              onClick={() => setSelectCryptocurrency({ id: 0, name: '', symbol: '', price: '' })}
            >
              Clear
            </button>
            <button type="submit" className="w-[40%] p-2 text-white bg-green-500 rounded hover:bg-green-600">
              Submit
            </button>
          </div>

        </form>

        {/* Display cryptocurrencies */}
        <div className="space-y-2">
          {cryptocurrencies.map((cryptocurrency) => (
            <div key={cryptocurrency.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <CardComponent cryptocurrency={cryptocurrency} />
              <div className='flex space-x-1'>
                <button onClick={() => setSelectCryptocurrency({ ...cryptocurrency })} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Edit
                </button>
                <button onClick={() => deleteItem(cryptocurrency.id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </main >
  );
}