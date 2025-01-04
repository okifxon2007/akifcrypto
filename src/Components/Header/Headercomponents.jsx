import React from 'react'
import { useNavigate } from 'react-router-dom'

const Headercomponents = () => {
  const nav = useNavigate('')
  function handlehome(){
    nav('/')
  }
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
    <h3 className="font-bold text-lg">Salom</h3>
    <p className="py-4">Bu yerda siz o'zingizga kerakli cryptovalyutalarni qo'shib qo'yishingiz mumkin</p>
  </div>
</dialog>
      </div>
    </nav>

    </div>
    
  )
}

export default Headercomponents