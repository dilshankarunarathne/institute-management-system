import React from "react";

const ForgotPassword = () => {
  return (
    <div>
      <h1>Forgot Password</h1>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
