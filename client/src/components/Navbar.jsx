import { Link , useNavigate} from "react-router-dom";

function Navbar(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        // window.location.reload();
    }
    return (
        <nav>
            <Link to={"/"}>Home</Link>{"  |  "}
          
            {token ? (
                <>
                  <Link to="/submission">My Submission</Link> {"  |  "}
                  <button onClick={handleLogout}>Logout</button>
                </> 
            ) : (
                <Link to={"/login"}>Login</Link>
            )}
        </nav>
    )
}

export default Navbar