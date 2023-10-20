import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { getAllCryptos } from "../../redux/actions";

function Home() {

  const dispatch = useDispatch()
  const cryptos = useSelector((state) => state.cryptos);
  
  useEffect(() => {
  dispatch(getAllCryptos());

}, []);



 



  return (
    <div className="w-full">
  <h1 className="text-2xl font-bold mb-4">Lista de Criptomonedas</h1>
  <section>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cryptos.map((crypto) => (
        <div key={crypto.id} className="bg-white p-4 rounded shadow">
          <img src={crypto.image} alt={crypto.name} className="w-16 h-16 mx-auto mb-2" />
          <p className="text-center">Name: {crypto.name}</p>
          <p className="text-center">Symbol: {crypto.symbol}</p>
          <p className="text-center">Market cap: {crypto.market_cap}</p>
          <p className="text-center">Total volume: {crypto.total_volume}</p>
        </div>
      ))}
    </div>
  </section>
</div>
  

  );
}

export default Home;
