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
        {isAuthenticated ? (
          <div id="user">
            <Link to="/create">Create</Link>
            <Link to="">All</Link>
            <Link to="">Categories</Link>
            <Link to="">Category 1</Link>
            <Link to="">Income</Link>
            <Link to="/expenses">Expenses</Link>
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
