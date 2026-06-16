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
  <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

    <div className="w-full max-w-sm">

      {/* ── Brand mark ── */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center mb-4">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">ContestHub</h1>
        <p className="text-slate-500 text-xs mt-1">Create your account</p>
      </div>

      {/* ── Card ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">

        {/* Name */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5 block">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5 block">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5 block">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2.5 bg-red-950/60 border border-red-800 text-red-400 px-4 py-2.5 rounded-lg text-xs">
            <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors duration-150 mt-1"
        >
          Create account
        </button>

      </div>

      {/* ── Footer link ── */}
      <p className="text-center text-xs text-slate-500 mt-5">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          Sign in
        </Link>
      </p>

    </div>
  </div>
);


}

export default Register;