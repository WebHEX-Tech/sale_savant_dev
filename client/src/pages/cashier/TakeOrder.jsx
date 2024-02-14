import React from 'react'
import { useSelector } from 'react-redux';

const TakeOrder = () => {
    const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div>TakeOrder</div>
  )
}

export default TakeOrder