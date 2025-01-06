import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderComponents = () => {
  const [data, setData] = useState([]);
  const [removedIds, setRemovedIds] = useState(() => {
    return JSON.parse(localStorage.getItem("removedIds")) || [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("malumot")) || [];
    setData(savedData);
  }, []);

  const handleHome = () => {
    navigate("/");
  };

  const handleRemove = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem("malumot", JSON.stringify(updatedData));

    const updatedRemovedIds = [...removedIds, id];
    setRemovedIds(updatedRemovedIds);
    localStorage.setItem("removedIds", JSON.stringify(updatedRemovedIds));

    // Reset icon state for removed ID
    const clickedIds = JSON.parse(localStorage.getItem("clickedIds")) || {};
    delete clickedIds[id];
    localStorage.setItem("clickedIds", JSON.stringify(clickedIds));
  };

  return (
    <div>
      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
        <div
          className="text-xl font-bold text-cyan-400 cursor-pointer"
          onClick={handleHome}
        >
          CRYPTOFOLIO
        </div>
        <div className="flex items-center space-x-4">
          <select className="bg-gray-800 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <button
            onClick={() => document.getElementById("watchlist_modal").showModal()}
            className="bg-cyan-400 hover:bg-blue-600 text-white py-2 px-6 rounded focus:outline-none"
          >
            WATCH LIST
          </button>

          <dialog id="watchlist_modal" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              {data.length > 0 ? (
                data.map((value, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 hover:bg-gray-700 transition duration-300 p-4 rounded-lg shadow-md cursor-pointer mt-8"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={value.img}
                        alt="crypto"
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold text-white">{value.id}</p>
                        <p className="text-gray-400 text-sm">{value.symbol}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-400">24h Change: {value.price}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">ATH Change: {value.ath}%</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(value.id)}
                      className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 hover:scale-105 transform transition duration-300 ease-in-out focus:outline-none mt-5"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-50 blur-sm rounded-lg"></span>
                      <span className="relative z-10">
                        <i className="fas fa-trash-alt mr-2"></i> Remove
                      </span>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No items in the watchlist.</p>
              )}
            </div>
          </dialog>
        </div>
      </nav>
    </div>
  );
};

export default HeaderComponents;
