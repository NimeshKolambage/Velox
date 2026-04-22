import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/HomePage"
import Login from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import HomePage from "./pages/HomePage"


const App = () => {

  const { authUser, checkAuth , isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth && !authUser) return(

    <div className="flex items-center justify-center h-screen">
     <Loader className="size-10 animate-spin"/>

    </div>
  )

  return (
    <div>
     
     <Navbar />
      <Routes>    
        <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={authUser?<SignupPage/>:<Navigate to="/" />}  />
        <Route path="/setting" element={<SettingPage/>} />
        <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login" />}  />
      </Routes>
    </div>
  )
}

export default App