import { useState } from "react";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

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

              <button>Login</button>
        </div>
    );
}

export default Login;