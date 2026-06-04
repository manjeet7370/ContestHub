import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    const nevigate = useNavigate();

    const handleLogin = async () => {
        try{
            const res = await api.post("/auth/login", {
                email,
                password,
            })


            console.log(res.data)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user))

            nevigate("/");
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
              <h2>Login</h2>

              <input
                type = "email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <br />
              <br />

              <input
               type = "password"
               placeholder="Enter Password"
               value={password}
               onChange={(e) => setpassword(e.target.value)}
              />

              <br />
              <br />

              <button onClick={handleLogin}
              >Login</button>
        </div>
    );
}

export default Login;