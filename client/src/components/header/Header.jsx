import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>
        <Link className="home" to="/">
          Sened
        </Link>
      </h1>
      <nav>
        <Link to="">All</Link>
        <Link to="">Categories</Link>
        <Link to="">Category 1</Link>
        <Link to="">Income</Link>
        <Link to="/expenses">Expenses</Link>
        <div id="guest">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
        <div id="user">
          <Link to="/create">Create</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>
    </header>
  );
}
