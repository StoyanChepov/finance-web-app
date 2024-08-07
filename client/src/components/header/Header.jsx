import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Header() {
  const { isAuthenticated } = useAuthContext();
  return (
    <header>
      <h1>
        <Link className="home" to="/">
          Sened
        </Link>
      </h1>
      <nav>
        {/* If user is authenticated, show user links, else show guest links */}
        <Link to="/expenses">Expenses</Link>
        {isAuthenticated ? (
          <div id="user">
            <Link to="/expenses/create">Add Еxpense</Link>
            <Link to="/logout">Logout</Link>
          </div>
        ) : (
          <div id="guest">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
