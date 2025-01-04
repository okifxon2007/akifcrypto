import React from 'react'
import Headercomponents from '../../Components/Header/Headercomponents'
import Maincomponents from '../../Components/Main/Maincomponents'
import Maincrypto from '../../Components/Maincrypto/Maincrypto'
const Homepage = () => {
  return (
    <div>
    <Headercomponents></Headercomponents>
    <Maincomponents></Maincomponents>
    <Maincrypto></Maincrypto>
    </div>
  )
}

export default Homepage