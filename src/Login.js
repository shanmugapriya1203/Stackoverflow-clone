import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "./config";
import axios from "axios";

function Login() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      let error = {};

      if (!values.password) {
        error.password = "Please enter a password";
      }
      if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i.test(values.username)) {
        error.username = "Please enter a username";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const data = await axios.post(`${config.api}/register/login`, values);
        setLoading(false);
        setError();
        window.localStorage.setItem("userId", data.data.userId);
        window.localStorage.setItem("Name", data.data.Name);
        navigate("/portal/home-page");
      } catch (error) {
        setLoading(false);
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
    },
  });

  return (
    <>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block text-center mt-5 p-2">
                    <img
                      src="https://content.presspage.com/uploads/2658/c800_logo-stackoverflow-square.jpg?98978"
                      style={{ width: "460px" }}
                    />
                  </div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form onSubmit={formik.handleSubmit} class="user">
                        <div class="form-group">
                          <input
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            type="text"
                            className={`form-control form-control-user ${
                              formik.errors.username ? "error-box" : ""
                            } 
                        ${
                          formik.touched.username && !formik.errors.username
                            ? "success-box"
                            : ""
                        }`}
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                          />
                          {formik.errors.username ? (
                            <span style={{ color: "red" }}>
                              {formik.errors.username}
                            </span>
                          ) : null}
                        </div>
                        <div class="form-group">
                          <input
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            type="password"
                            className={`form-control form-control-user ${
                              formik.errors.password ? "error-box" : ""
                            } 
                        ${
                          formik.touched.password && !formik.errors.password
                            ? "success-box"
                            : ""
                        }`}
                            id="exampleInputPassword"
                            placeholder="Password"
                          />
                          {formik.errors.password ? (
                            <span style={{ color: "red" }}>
                              {formik.errors.password}
                            </span>
                          ) : null}
                        </div>
                        {error ? (
                          <div
                            className="card mb-3"
                            style={{
                              backgroundColor: "lightgrey",
                              color: "black",
                            }}
                          >
                            <div className="card-body text-center">
                              <i
                                class="fa-solid fa-circle-xmark mr-3"
                                style={{ color: "red" }}
                              ></i>
                              {error}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {loading ? (
                          <div class="d-flex justify-content-center">
                            <div class="spinner-border text-info" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        ) : (
                          <input
                            type="submit"
                            onClick={() => {
                              setError();
                            }}
                            class="btn btn-primary btn-user btn-block"
                            value={"Login"}
                          />
                        )}
                        <hr />
                      </form>
                      <Link
                        to={"create-account"}
                        class="btn btn-google btn-user btn-block "
                        style={{ borderRadius: "50px" }}
                      >
                        <i class="fa-solid fa-user-plus mr-3"></i> Create
                        Account
                      </Link>
                      <Link
                        style={{ borderRadius: "50px" }}
                        to={"forgot-password"}
                        class="btn btn-facebook btn-user btn-block "
                      >
                        <i class="fa-solid fa-unlock mr-3"></i> Forgot Password
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
