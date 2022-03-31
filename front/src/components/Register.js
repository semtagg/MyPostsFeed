import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [nickname, setNickname] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await AuthService.register(nickname).then(
              (response) => {
                  // check for token and user already exists with 200
                  //   console.log("Sign up successfully", response);
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
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black border-0">
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                        <form className="mx-1 mx-md-4">

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="email" id="form3Example3" className="form-control form-control-lg"
                                     placeholder="Enter a valid nickname"
                                     onChange={(e) => setNickname(e.target.value)}
                              />
                              <label className="form-label" htmlFor="form3Example1c">Your Nickname</label>
                            </div>
                          </div>

                          <div className="d-flex justify-content-left mx-3 mb-3 mb-lg-4">
                            <button type="button" className="btn btn-primary btn-lg px-3"
                                    onClick={handleRegister}
                            >
                              Register
                            </button>
                          </div>

                        </form>

                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                             className="img-fluid" alt="Sample"/>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
};

export default Register;

/* <form onSubmit={handleRegister}>
              <h3>Sign up</h3>
              <input
                type="text"
                placeholder="register"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <button type="submit">Sign up</button>
          </form>*/
