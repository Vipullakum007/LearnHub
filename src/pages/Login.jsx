import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handling input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();
      console.log(' response : ', responseData);
      if (response.ok) {
        toast.success("Login successful");
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('username', responseData.username);
        localStorage.setItem('userid', responseData.userid);
        setUser({ username: "", password: "" });
        navigate("/");
      } else {
        toast.error(responseData.extraDetails || responseData.message);
      }
    } catch (error) {
      toast.error("Login error: " + error.message);
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image">
              <img src="/images/login.png" alt="Login" width={500} height={500} />
            </div>

            <div className="registration-form">
              <h1 className="main-heading mb-3">Login Form</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    id="username"
                    required
                    autoComplete="off"
                    value={user.username}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    id="password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-submit">Login Now</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
