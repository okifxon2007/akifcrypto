import React, { useEffect, useState } from "react";
import imgone from "../../img/d.jpg";
import axios from "axios";

const Maincomponents = () => {
  const [trend, settrend] = useState([]);
  useEffect(() => {
    (function () {
      try {
        axios(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=4&page=1&sparkline=false&price_change_percentage=24h`
        )
          .then((data) => {
      
            settrend(data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log("qandaydir hatolik yuz berdi");
      }
    })();
  }, []);
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${imgone})`,
      }}
    >
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold text-cyan-400 mt-14">
          CRYPTOFOLIO WATCH LIST
        </h1>
        <p className="text-lg mt-2 text-gray-500">
          Get All The Info Regarding Your Favorite Crypto Currency
        </p>
      </div>

      <div className="flex justify-center gap-32 mt-10 flex-wrap">
        {trend &&
          trend.map((value, index) => (
            <div className="text-center" key={index}>
              <img
                src={value.image}
                alt="ETH"
                className="mx-auto w-32"
              />
              <p style={{color:value.ath_change_percentage >= 0 ? 'green' : 'red'}} className="mt-2">{value.symbol} {value.ath_change_percentage}</p>
              <p className="text-lg font-bold">₹ {value.price_change_percentage_24h}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Maincomponents;
