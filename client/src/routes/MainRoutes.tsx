
import { Route, Routes } from 'react-router'
import { Home } from '../pages/Home'
import { Auth } from '../pages/Auth/Auth'

export const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/signup' element={<Auth/>}/>
    </Routes>
  )
}
