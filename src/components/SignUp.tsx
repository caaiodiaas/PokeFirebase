import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/pokeball.png";

function SignUp() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar">
        <img src={Logo} alt="pokeball" width={50} />
        <h1>PokeFirebase</h1>
      </nav>
      <div className="create">
        <h2>Sign up</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createUserWithEmailAndPassword(auth, email, password)
              .then(() => {
                alert("Signed up succesfully!");
                navigate("/login");
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
            <button onClick={() => navigate("/login")}>Back</button>
            <button type="submit">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
