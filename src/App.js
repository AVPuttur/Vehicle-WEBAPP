import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '../src/pages/Login'
import AddUser from './pages/AddUser'
import AddVehicle from './pages/AddVehicle'
import Dashboard from './pages/Dashboard'
import EditProfile from './pages/EditProfile'
import EditUser from './pages/EditUser'
import EditVehicle from './pages/EditVehicle'

const App = () => {
  return <div>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Dashboard/>}/>
        <Route path="/add-user" element={<AddUser/>}/>
        <Route path="/add-vehicle" element={<AddVehicle/>}/>
        <Route path="/edit-profile" element={<EditProfile/>}/>
        <Route path="/edit-user" element={<EditUser/>}/>
        <Route path="/edit-vehicle" element={<EditVehicle/>}/>
      </Routes>
    </BrowserRouter>
  </div>
}


export default App;
