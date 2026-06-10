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
        <nav className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Brand / Logo */}
                    <Link to="/" className="flex items-center transition-transform hover:scale-105">
                    <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent tracking-tight">
                          ContestHub
                    </h1>
                    </Link>

                    {/* Navigation Container */}
                    <div className="flex items-center gap-6">
                        
                        <Link 
                            to="/" 
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
                        >
                            Home
                        </Link>
                        
                        {/* Divider Line */}
                        <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>

                        {token ? (
                            <div className="flex items-center gap-4">
                                <Link 
                                    to="/submissions"
                                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
                                >
                                    My Submissions
                                </Link> 

                          {user?.role === "ADMIN" && (
                               <Link
                               to="/admin"
                               className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
                               >
                                 Admin
                            </Link>
    )}
                                <button 
                                    onClick={handleLogout}
                                    className="text-sm font-medium text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 px-4 py-2 rounded-lg border border-transparent hover:border-red-500/30 transition-all duration-200"
                                >
                                    Logout
                                </button>
                            </div> 
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link 
                                    to="/login"
                                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
                                >
                                    Login
                                </Link>
                                
                                <Link 
                                    to="/register" 
                                    className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg shadow-sm shadow-indigo-500/25 transition-all duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar