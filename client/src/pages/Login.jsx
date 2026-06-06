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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">

            <h2 className="text-3xl font-bold text-center mb-6">
                Login
            </h2>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded p-2 mb-4"
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="w-full border rounded p-2 mb-4"
            />

            <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
                Login
            </button>

            <p className="text-center mt-4">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="text-blue-600 hover:underline"
                >
                    Register
                </Link>
            </p>

        </div>
    </div>
);
}

export default Login;