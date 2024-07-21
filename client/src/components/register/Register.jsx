export default function Register() {
  return (
    <section id="register">
      <h1>Register</h1>
      <form id="register-form">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <label for="re-password">Re-Password:</label>
        <input type="password" id="re-password" name="re-password" required />
        <input type="submit" value="Register" />
      </form>
    </section>
  );
}
