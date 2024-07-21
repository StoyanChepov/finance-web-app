export default function Login() {
  return (
    <section id="login">
      <h1>Login</h1>
      <form id="login-form">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <input type="submit" value="Login" />
      </form>
    </section>
  );
}
