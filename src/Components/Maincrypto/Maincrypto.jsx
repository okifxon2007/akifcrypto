import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
const Maincrypto = () => {
  const [search, setSearch] = useState("");
  const [data, setdata] = useState([])
  const [page, setpage] = useState(1)
  
  const nav = useNavigate()
  console.log(page);
  function handlecard(id){
    nav(`/pages/${id}`)
  }
  useEffect(() =>{
    (function() {
     
      const add = localStorage.getItem(JSON.parse(page))
      console.log(add);
      try {
        axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`)
      .then(data =>{
       
        setdata(data.data)
      })
      .catch(err =>{
        console.log(err);
        
      })
      } catch (error) {
        console.log('qandaydir hatolik yuz berdi');
        
      }
     
      
  })();
  
   
  },[page])

 
  function handlenext() {
    setpage(prevPage => prevPage + 1); 
    localStorage.setItem('page', page)
  }
  
  function handleback() {
      setpage(prevvPage => prevvPage - 1);
      localStorage.setItem('page', page)
  }
  
  


  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Cryptocurrency Prices by Market Cap</h1>

      
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search For a Crypto Currency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md: p-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border cursor-pointer border-gray-700">
          <thead>
            <tr className="bg-cyan-300 text-black">
              <th className="text-left px-4 py-2 border-b border-gray-700">Coin</th>
              <th className="text-left px-4 py-2 border-b border-gray-700">Price</th>
              <th className="text-left px-4 py-2 border-b border-gray-700">24h Change</th>
              <th className="text-left px-4 py-2 border-b border-gray-700">Market Cap</th>
            </tr>
          </thead>
          <tbody>
         {data && data.map((value, index) =>(
             <tr key={index}
             className="hover:bg-gray-700 transition duration-300"
             onClick={ ()=> handlecard(value.id)}
           >
             <td className="flex items-center px-4 py-2 border-b border-gray-700">
               <img
                 src={value.image}
                 alt=''
                 className="w-8 h-8 rounded-full mr-3"
               />
               <div>
                 <p className="font-semibold">{value.symbol}</p>
                 <p className="text-gray-400 text-sm">{value.id}</p>
               </div>
             </td>
             <td className="px-4 py-2 border-b border-gray-700">{value.price_change_percentage_24h}</td>
             <td
  style={{
    color: value.ath_change_percentage >= 0 ? 'green' : 'red',
  }}
>
  {value.ath_change_percentage}
</td>

             <td className="px-4 py-2 border-b border-gray-700">
               <div className="bg-gray-800 text-center text-sm px-3 py-1 rounded-lg">
               ₹ {value.price_change_percentage_24h}
               </div>
             </td>
           </tr>
         ))}
          
           
          </tbody>
       
        </table>
        <div className="ml-auto mr-auto flex justify-center mt-10">
        <button className="text-4xl" onClick={handleback}>⬅️---</button>
        <button className="text-4xl" onClick={handlenext}>➡️</button>
        </div>
      </div>
    </div>
  );
};

export default Maincrypto;
