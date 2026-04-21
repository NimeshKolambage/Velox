import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/HomePage"
import Login from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"

const App = () => {
  return (
    <div>
     
     <Navbar />
      <Routes>    
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/setting" element={<SettingPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </div>
  )
}

export default App