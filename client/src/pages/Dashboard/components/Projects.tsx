import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

export const Projects = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") ?? "null");

  useEffect(()=>{
    // dispatch(get)
  })


  return (
    <div>Projects</div>
  )
}
