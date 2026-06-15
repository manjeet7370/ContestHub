import { Link , useNavigate} from "react-router-dom";

function Navbar(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        
        localStorage.removeItem("user");
        navigate("/login");
        // window.location.reload();
    }
return (
  <nav className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center h-14">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span className="text-sm font-bold text-white tracking-tight">
            ContestHub
          </span>
        </Link>

        {/* Right side nav */}
        <div className="flex items-center gap-1">

          <Link
            to="/"
            className="text-xs font-medium text-slate-400 hover:text-slate-100 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors duration-150"
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/submissions"
                className="text-xs font-medium text-slate-400 hover:text-slate-100 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors duration-150"
              >
                My Submissions
              </Link>

              {user?.role === "ADMIN" && (
                <Link
                  to="/admin"
                  className="text-xs font-medium text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded-md hover:bg-amber-950 transition-colors duration-150"
                >
                  Admin
                </Link>
              )}

              <div className="w-px h-4 bg-slate-800 mx-1" />

              <button
                onClick={handleLogout}
                className="text-xs font-medium text-slate-400 hover:text-red-400 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs font-medium text-slate-400 hover:text-slate-100 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors duration-150"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-md transition-colors duration-150 ml-1"
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </div>
  </nav>
);

}

export default Navbar