import React, {useState} from "react";
import {useNavigate} from "react-router";
import AuthService from "../services/auth.service";

const Login = () => {
  const [nickname, setNickname] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(nickname).then(
        () => {
          navigate("/");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                   className="img-fluid"
                   alt="Sample"/>
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3" className="form-control form-control-lg"
                         placeholder="Enter a valid nickname"
                         onChange={(e) => setNickname(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">Your Nickname</label>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="button" className="btn btn-primary btn-lg px-3"
                          onClick={handleLogin}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                                                                                        className="link-danger">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

/*<div>
  <form onSubmit={handleLogin}>
    <h3>Login</h3>
    <input
      type="text"
      placeholder="nickname"
      value={nickname}
      onChange={(e) => setNickname(e.target.value)}
    />
    <button type="submit">Log in</button>
  </form>
</div>*/