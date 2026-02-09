import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>

        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>

          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {/* Version statique: navigation vers /user */}
          <Link to="/user" className="sign-in-button">
            Sign In
          </Link>

          {/* Plus tard, quand tu feras le vrai login API :
              remplace le Link par un <button className="sign-in-button">Sign In</button>
              et tu géreras le submit. */}
        </form>
      </section>
    </div>
  );
}