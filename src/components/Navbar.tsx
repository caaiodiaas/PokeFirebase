import React from "react";
import Logo from "../assets/images/pokeball.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <img src={Logo} alt="pokeball" width={50} />
      <h1>PokeFirebase</h1>
      <div className="links">
        <Link
          to="/"
          style={{
            color: "rgb(77, 77, 77)",
          }}
        >
          All Pokemons
        </Link>
        <Link
          to="/create"
          style={{
            color: "white",
            backgroundColor: "rgb(77, 77, 77)",
            borderRadius: "8px",
          }}
        >
          New Pokemon
        </Link>
        <button
          className="bg-red-400 p-[4px] px-3 text-white ml-3 rounded"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
