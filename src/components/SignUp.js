import React, { useState } from "react";
import { useHistory } from "react-router";

export default function SignUp(props) {
  const history = useHistory();
  const [sign, setsign] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const onchange = (e) => {
    setsign({ ...sign, [e.target.name]: e.target.value });
  };
  const SignUp = async(e) => {
  const host = "http://localhost:5000";
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:sign.name,email:sign.email,password:sign.password})
    });
        const json = await response.json();
        localStorage.setItem('token','authtoken')
        console.log(json)

    if (sign.password !== sign.confirm && json.success === false) {
      props.showAlert("Your Passwords Doesn't Match!","danger")
    } else {
      localStorage.setItem("token", json.authtoken);
      history.push("/");
    }
  };

  return (
    <div
      className="d-flex aling-items-center justify-content-center"
      style={{ display: "block", width: "80%", margin: "100px auto" }}
    >
      <div className="container my-3 border px-3 py-3">
        <h2 className="text-center">SignUp</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              value={sign.name}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              value={sign.email}
              onChange={onchange}
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
              className="form-control"
              id="password"
              name="password"
              value={sign.password}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm"
              name="confirm"
              value={sign.confirm}
              onChange={onchange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={SignUp}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
