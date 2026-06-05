import { useState } from "react";
import api from "../services/api"
import { useNavigate, Link } from "react-router-dom";
 
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const  [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleRegister = async () => {
        try{
            const res = await api.post("/auth/register", {
                name,
                email,
                password,
            });
            console.log(res.data);
            alert("Registration Successful");
            navigate("/login");
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Register</h2>

            <input type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
             />
             <br />
             <br />

             <input type="email"
             placeholder="Enter Email"
             value={email}
             onChange={(e) => setEmail(e.target.value)} 
             />
             <br />
             <br />

            <input type="password"
             placeholder="Enter Password"
             value={password}
             onChange={(e) => setPassword(e.target.value)} 
             />

             <br />
             <br />

             <button onClick={handleRegister}>
                Register
             </button>

             <br />
             <p>
                Already have an account ? <Link to="/login">Login</Link>
             </p>

        </div>


    );


}

export default Register;