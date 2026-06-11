import { useState } from "react";
import api from "../services/api"
import { useNavigate, Link } from "react-router-dom";
 
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const  [password, setPassword] = useState("")
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
        try{
            setError("")
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
                    setError(
              err.response?.data?.message ||
            "Server error"
           );
        }
    };

return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">

            <h2 className="text-3xl font-bold text-center mb-6">
                Register
            </h2>

            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded p-2 mb-4"
            />

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
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded p-2 mb-4"
            />
            {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded mb-4 text-sm">
            {error}
            </div>
            )}

            <button
                onClick={handleRegister}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
                Register
            </button>

            <p className="text-center mt-4">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-blue-600 hover:underline"
                >
                    Login
                </Link>
            </p>

        </div>
    </div>
);


}

export default Register;