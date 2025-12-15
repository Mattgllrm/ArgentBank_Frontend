import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { loginUser, fetchUserProfile } from "../redux/userSlice";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des champs vides
    if (!email || !password) {
      // On utilise le state 'error' de Redux pour l'affichage
      dispatch({ type: "user/loginUser/rejected", payload: "Veuillez remplir tous les champs !" });
      return;
    }

    try {
      // Login
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        const token = resultAction.payload;

        // Fetch profil
        const profileAction = await dispatch(fetchUserProfile(token));

        if (fetchUserProfile.fulfilled.match(profileAction)) {
          navigate("/user"); // Redirection seulement si fetch réussi
        } else {
          console.error("Impossible de récupérer le profil");
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className="sign-in-button" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </section>
      </main>
    </>
  );
}
