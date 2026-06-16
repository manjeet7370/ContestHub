import {Routes , Route} from "react-router-dom"
import Contests from "./pages/Contests";
import ContestsDeatils from "./pages/ContestDetails";
import ProblemDeatils from "./pages/ProblemDetails";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import MySubmissions from "./pages/MySubmissions";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import { Navigate } from "react-router-dom";
import Footer from "./components/Footer";


function App() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Contests/>} />
        <Route path="/contest/:id" element={<ContestsDeatils/>} />
        <Route path="/problem/:id" element={<ProblemDeatils/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/submissions" element = {<ProtectedRoute> <MySubmissions/> </ProtectedRoute> } />
        <Route path="/register" element={<Register/>} />
        <Route
          path="/admin"
          element={
          user?.role === "ADMIN"
          ? <AdminDashboard />
          : <Navigate to="/" />
        }
        /> 
      </Routes>
      <Footer />
      
      </>
  );
}

export default App;