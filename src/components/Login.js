import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const host = "http://localhost:5000";
  const context = useContext(noteContext);
  const { logUser } = context;
  const [login, setlogin] = useState({ email: "", password: "" });
  const history = useHistory();

  const onchange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: login.email, password: login.password }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success) {
      localStorage.setItem("token", json.authtoken);
      history.push("/");
    }else{
      props.showAlert("Invalid Credentions","danger")
    }
  };

  return (
    <div
      className="d-flex aling-items-center justify-content-center"
      style={{ display: "block", width: "80%", margin: "100px auto" }}
    >
      <div className="container my-3 border px-3 py-3">
        <h2 className="text-center">Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={onchange}
              value={login.email}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              onChange={onchange}
              value={login.password}
            />
          </div>
          <button type="submit" class="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
