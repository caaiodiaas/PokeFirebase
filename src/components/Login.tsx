import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/pokeball.png";

function Login() {
  const auth = getAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <nav className="navbar">
        <img src={Logo} alt="pokeball" width={50} />
        <h1>PokeFirebase</h1>
      </nav>
      <div className="create">
        <h2>Sign in</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // @ts-ignore
                localStorage.setItem("user", userCredential.user.auth);
                navigate("/");
              })
              .catch((error) => {
                alert("Error");
                console.log(error);
              });
          }}
        >
          <label>Email:</label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between">
            <button onClick={() => navigate("/signup")}>Sign up</button>
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
