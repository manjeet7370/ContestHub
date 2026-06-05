import { useState } from "react";
import api from "../services/api";
import { useNavigate , Link} from "react-router-dom";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const res = await api.post("/auth/login", {
                email,
                password,
            })


            console.log(res.data)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user))

            navigate("/");
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
              <p>
               Don't have account ? <Link to="/register">Register</Link>
              </p>
        </div>
    );
}

export default Login;