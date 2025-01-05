import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Headercomponents = () => {
  const [data, setdata] = useState([])
  const nav = useNavigate('')
  useEffect(() =>{
    const data = JSON.parse(localStorage.getItem('malumot'))
    setdata(data)
    console.log(data);
    
  },[])
  function handlehome(){
    nav('/')
  }
  const handleRemove = (e, id) => {
  e.stopPropagation();

  const malumotlar = JSON.parse(localStorage.getItem("malumot") || "[]");
  const updatedMalumotlar = malumotlar.filter((item) => item.id !== id);

  localStorage.setItem("malumot", JSON.stringify(updatedMalumotlar));

  window.location.reload();
};

  return (
    <div>
            <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-cyan-400 cursor-pointer" onClick={handlehome}>CRYPTOFOLIO</div>
      <div className="flex items-center space-x-4">
        <select
          className="bg-gray-800 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        <button  onClick={()=>document.getElementById('my_modal_3').showModal()} className="bg-cyan-400 hover:bg-blue-600 text-white py-2 px-6 rounded focus:outline-none">
          WATCH LIST
        </button>
        
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    


{data && data.map((value, index) =>(
  <div
  key={index}
  className="bg-gray-800 hover:bg-gray-700 transition duration-300 p-4 rounded-lg shadow-md cursor-pointer mt-8"
 
>
  <div className="flex items-center mb-4">
    <img
      src={value.ath}
      alt=""
      className="w-10 h-10 rounded-full mr-4"
    />
    <div>
      <p className="font-semibold text-white">{value.id}</p>
      <p className="text-gray-400 text-sm">{value.img}</p>
    </div>
  </div>
  <div className="flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-400">24h Change:{value.price}</p>
      <p >
       {value.symbol}%
      </p>
    </div>
    <div>
      <p className="text-sm text-gray-400">ATH Change:{value.price}</p>
      <button
        className={`text-lg  flex items-center`}
      >
        <i className="fas fa-eye mr-2"></i> {value.symbol}%
      </button>
    </div>
  </div>
  <div className="bg-gray-700 text-center text-sm text-white py-2 mt-4 rounded-lg">
    ₹ 
  </div>
  <button
  onClick={(e) => handleRemove(e, value.id)}
  className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 hover:scale-105 transform transition duration-300 ease-in-out focus:outline-none mt-5"
>
  <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-50 blur-sm rounded-lg"></span>
  <span className="relative z-10">
    <i className="fas fa-trash-alt mr-2"></i> Remove
  </span>
</button>
</div>

))}



  </div>
</dialog>
      </div>
    </nav>

    </div>
    
  )
}

export default Headercomponents