import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>
        <Link className="home" href="">
          Sened
        </Link>
      </h1>
      <nav>
        <Link href="">All</Link>
        <div class="dropdown">
          <Link href="">Categories</Link>
          <div class="dropdown-content">
            <Link href="">Category 1</Link>
            <Link href="">Income</Link>
            <Link href="">Expenses</Link>
          </div>
        </div>
        <div id="guest">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
        <div id="user">
          <Link href="/create">Create</Link>
          <Link href="/logout">Logout</Link>
        </div>
      </nav>
    </header>
  );
}
