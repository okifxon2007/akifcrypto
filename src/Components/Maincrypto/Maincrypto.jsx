// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Maincrypto = () => {
//   const [search, setSearch] = useState("");
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const searchref = useRef('')
//   const [clickedIds, setClickedIds] = useState(() => {
//     const storedClickedIds = JSON.parse(localStorage.getItem("clickedIds") || "{}");
//     return storedClickedIds;
//   });

//   const nav = useNavigate();

//   useEffect(() => {
//     localStorage.setItem("clickedIds", JSON.stringify(clickedIds));
//   }, [clickedIds]);

//   useEffect(() => {
//     axios
//       .get(
//         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=${searchref.current.value}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
//       )
//       .then((response) => {
//         console.log(response.data);
        
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("Error loading data");
//       });
//   }, [page]);

//   const handleClick = (e, id, ath_change_percentage, price_change_percentage_24h, symbol, image) => {
//     e.stopPropagation();

//     const mal = {
//       id: id,
//       ath: ath_change_percentage,
//       img: image,
//       symbol: symbol,
//       price: price_change_percentage_24h,
//     };

//     const storedData = JSON.parse(localStorage.getItem("malumot") || "[]");
//     const alreadyExists = storedData.some((item) => item.id === id);

//     if (alreadyExists) {
//       toast.warn("This data is already saved!");
//       return;
//     }

//     storedData.push(mal);
//     localStorage.setItem("malumot", JSON.stringify(storedData));

//     setClickedIds((prev) => ({
//       ...prev,
//       [id]: true,
//     }));

//     toast.success("Data saved successfully!");
//   };

//   const handleNext = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   const handleBack = () => {
//     setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
//   };

//   const handleCard = (id) => {
//     nav(`/pages/${id}`);
//   };
//   const handlesearch = () =>{
//     console.log('salom', searchref.current.value);
//     searchref.current.value = ''
    
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Cryptocurrency Prices by Market Cap</h1>

//       <div className="flex justify-center mb-6">
//   <div className="relative w-full">
//     <input
//     ref={searchref}
//       type="text"
//       placeholder="Search For a Crypto Currency..."
//       className="w-full md:p-3 pl-12 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
//     />
//     <button
//      onClick={handlesearch}
//       className="w-full mt-8 transform -translate-y-1/2 bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-500 focus:outline-none"
//     >
//       🔍Search
//     </button>
//   </div>
// </div>


//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border cursor-pointer border-gray-700">
//           <thead>
//             <tr className="bg-cyan-300 text-black">
//               <th className="text-left px-4 py-2 border-b border-gray-700">Coin</th>
//               <th className="text-left px-4 py-2 border-b border-gray-700">Price</th>
//               <th className="text-left px-4 py-2 border-b border-gray-700">24h Change</th>
//               <th className="text-left px-4 py-2 border-b border-gray-700">Market Cap</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data &&
//               data
//                 .filter((value) =>
//                   value.name.toLowerCase().includes(search.toLowerCase())
//                 )
//                 .map((value, index) => (
//                   <tr
//                     key={index}
//                     className="hover:bg-gray-700 transition duration-300"
//                     onClick={() => handleCard(value.id)}
//                   >
//                     <td className="flex items-center px-4 py-2 border-b border-gray-700">
//                       <img
//                         src={value.image}
//                         alt=""
//                         className="w-8 h-8 rounded-full mr-3"
//                       />
//                       <div>
//                         <p className="font-semibold">{value.symbol}</p>
//                         <p className="text-gray-400 text-sm">{value.id}</p>
//                       </div>
//                     </td>
//                     <td className="px-4 py-2 border-b border-gray-700">{value.price_change_percentage_24h}</td>
//                     <td
//                       style={{
//                         color: value.ath_change_percentage >= 0 ? "green" : "red",
//                       }}
//                     >
//                       <button
//                         onClick={(e) =>
//                           handleClick(
//                             e,
//                             value.id,
//                             value.ath_change_percentage,
//                             value.price_change_percentage_24h,
//                             value.symbol,
//                             value.image
//                           )
//                         }
//                       >
//                         <i
//                           className={`fas fa-eye ${
//                             clickedIds[value.id] ? "text-green-500" : "text-gray-500"
//                           }`}
//                         ></i>
//                       </button>
//                       {value.ath_change_percentage}
//                     </td>
//                     <td className="px-4 py-2 border-b border-gray-700">
//                       <div className="bg-gray-800 text-center text-sm px-3 py-1 rounded-lg">
//                         ₹ {value.price_change_percentage_24h}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//           </tbody>
//         </table>
//         <div className="ml-auto mr-auto flex justify-center mt-10">
//           <button className="text-4xl" onClick={handleBack}>
//             ⬅️---
//           </button>
//           <button className="text-4xl" onClick={handleNext}>
//             ➡️
//           </button>
//         </div>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default Maincrypto;



import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Maincrypto = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const searchref = useRef("");
  const [clickedIds, setClickedIds] = useState(() => {
    const storedClickedIds = JSON.parse(localStorage.getItem("clickedIds") || "{}");
    return storedClickedIds;
  });

  const nav = useNavigate();

  useEffect(() => {
    localStorage.setItem("clickedIds", JSON.stringify(clickedIds));
  }, [clickedIds]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error loading data");
      });
  }, [page]);

  const handleClick = (e, id, ath_change_percentage, price_change_percentage_24h, symbol, image) => {
    e.stopPropagation();

    const mal = {
      id: id,
      ath: ath_change_percentage,
      img: image,
      symbol: symbol,
      price: price_change_percentage_24h,
    };

    const storedData = JSON.parse(localStorage.getItem("malumot") || "[]");
    const alreadyExists = storedData.some((item) => item.id === id);

    if (alreadyExists) {
      toast.warn("This data is already saved!");
      return;
    }

    storedData.push(mal);
    localStorage.setItem("malumot", JSON.stringify(storedData));

    setClickedIds((prev) => ({
      ...prev,
      [id]: true,
    }));

    toast.success("Data saved successfully!");
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleBack = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleCard = (id) => {
    nav(`/pages/${id}`);
  };

  const handlesearch = () => {
    const query = searchref.current.value.trim().toLowerCase();
    setSearch(query);
    searchref.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Cryptocurrency Prices by Market Cap</h1>

      <div className="flex justify-center mb-6">
        <div className="relative w-full">
          <input
            ref={searchref}
            type="text"
            placeholder="Search For a Crypto Currency..."
            className="w-full md:p-3 pl-12 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          <button
            onClick={handlesearch}
            className="w-full mt-8 transform -translate-y-1/2 bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-500 focus:outline-none"
          >
            🔍Search
          </button>
        </div>
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
            {data &&
              data
                .filter((value) =>
                  value.name.toLowerCase().includes(search)
                )
                .map((value, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-700 transition duration-300"
                    onClick={() => handleCard(value.id)}
                  >
                    <td className="flex items-center px-4 py-2 border-b border-gray-700">
                      <img
                        src={value.image}
                        alt=""
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
                        color: value.ath_change_percentage >= 0 ? "green" : "red",
                      }}
                    >
                      <button
                        onClick={(e) =>
                          handleClick(
                            e,
                            value.id,
                            value.ath_change_percentage,
                            value.price_change_percentage_24h,
                            value.symbol,
                            value.image
                          )
                        }
                      >
                        <i
                          className={`fas fa-eye ${
                            clickedIds[value.id] ? "text-green-500" : "text-gray-500"
                          }`}
                        ></i>
                      </button>
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
          <button className="text-4xl" onClick={handleBack}>
            ⬅️---
          </button>
          <button className="text-4xl" onClick={handleNext}>
            ➡️
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Maincrypto;
