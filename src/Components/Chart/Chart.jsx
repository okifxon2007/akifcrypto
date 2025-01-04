import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const [datas, setdatas] = useState([])
  const { id } = useParams();
  useEffect(() => {
    (function () {
      try {
        axios(`https://api.coingecko.com/api/v3/coins/${id}`)
          .then((response) => {
           console.log(response.data);
           
            setdatas(response.data.tickers)
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log("qandaydir hatolik yuz berdi");
      }
    })();
  }, [id]);

  const data = datas.map((value, index) => ({
    date: value.timestamp || `Date ${index + 1}`, 
    price: value.last || 0, 
  }));
  

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
      
          <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
         
          <Tooltip
            contentStyle={{
              backgroundColor: "#1A202C",
              border: "none",
              borderRadius: "5px",
            }}
            labelStyle={{ color: "#CBD5E0" }}
            itemStyle={{ color: "#4FD1C5" }}
          />
       
          <Line
            type="monotone"
            dataKey="price"
            stroke="#4FD1C5"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
