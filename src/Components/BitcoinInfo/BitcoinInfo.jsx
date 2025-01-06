import React, { useEffect, useState } from "react";
import Chart from "../Chart/Chart";
import axios from "axios";
import { useParams } from "react-router-dom";

const BitcoinInfo = () => {
  const [idd, setidd] = useState(null); 
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    (function () {
      try {
        axios(`https://api.coingecko.com/api/v3/coins/${id}`)
          .then((response) => {
  
            setidd(response.data); 
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log("qandaydir hatolik yuz berdi");
      }
    })();
  }, [id]);

 
  if (!idd) {
    return <div className="text-white">
       <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="relative w-24 h-24">
       
        <div className="absolute inset-0 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
       
        <div className="absolute inset-4 border-4 border-l-blue-500 border-r-blue-500 border-t-transparent border-b-transparent rounded-full animate-spin-reverse"></div>
        
        <div className="absolute inset-8 bg-blue-500 rounded-full"></div>
      </div>
    </div>
    </div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col md:flex-row items-start bg-gray-900 text-white p-6 rounded-lg w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-start space-y-6 w-full md:w-1/3">
          <div className="flex items-center space-x-4">
          
            <img src={idd.image.small} alt={idd.name} />
            <h1 className="text-4xl font-bold">{idd.name}</h1>
          </div>

          <p className="text-gray-300 leading-relaxed w-80">
  {idd.description.en.split(' ').slice(0, 10).join(' ') + (idd.description.en.split(' ').length > 10 ? '...' : '')}
</p>


          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-bold text-gray-300">Rank:</span>{" "}
              <span className="text-white">{idd.market_cap_rank}</span>
            </p>
            <p className="text-lg">
              <span className="font-bold text-gray-300">Current Price:</span>{" "}
              <span className="text-white">₹ {idd.sentiment_votes_down_percentage}</span>
            </p>
            <p className="text-lg">
              <span className="font-bold text-gray-300">Market Cap:</span>{" "}
              <span className="text-white">₹ {idd.sentiment_votes_up_percentage}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-2/3 mt-6 md:mt-0 md:ml-6">
          <Chart></Chart>

          <div className="flex space-x-4 mt-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              24 Hours
            </button>
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
              30 Days
            </button>
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
              3 Months
            </button>
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
              1 Year
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitcoinInfo;
