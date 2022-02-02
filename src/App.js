import React, { Component } from "react";
import Dialog from "./components/Dialog";
import "./App.css";
import "./media.css";
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const emailRegex = RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const passwordRegex = RegExp(
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
);
const formValid = (formErrors) => {
  let valid = true;
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      
      isOpen:false,
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: "",
      },
    };
  }
 
  handleSubmit = (e) => {
    e.preventDefault();
    const key = this.email.value;
    const value = this.password.value;
    if (formValid(this.state.formErrors)) {
      const data = { name: key, password: value };

      fetch(
        "https://gs-dev.qa-enphaseenergy.com/session-mgr/api/v1/admin/signin/",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          for (let i in data) {
            if ("GS-Authorization" === i) {
              let data1 = data[i];
              sessionStorage.setItem("token", data1);
            }
            if ("user_name" === i) {
              let data1 = data[i];
              sessionStorage.setItem("user_name", data1);
            }
            if ("account_company_name" === i) {
              let data1 = data[i];
              sessionStorage.setItem("account_company_name", data1);
            }

            if ("account_time_zone" === i) {
              let data1 = data[i];
              sessionStorage.setItem("account_time_zone", data1);
            }
            if ("roles" === i) {
              let data1 = data[i];
              sessionStorage.setItem("roles", data1);
            }
            if ("Success" === data[i]) {
              
              // <Router>
              //   <Routes>
              //     <Route exact path="/" component={Home} />
              //     <Navigate to="/Home" />
              //   </Routes>
              // </Router>;
            }
          }
        });
    } else {
      console.error("Invalid");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid Email Address";
        break;
      case "password":
        formErrors.password = passwordRegex.test(value)
          ? ""
          : "Invalid Password";
        break;
      default:
        break;
    }
  };

  render() {
    const { formErrors } = this.state;


    return (
      <div>
        {/* first section */}
        <div className="centered">
          <img src="Images/Image 235.png" className="logo" />
          <h3 className="Grid">Grid Services-Installer Intake Portal</h3>
        </div>

        {/* second section */}
        <div className="section">
          <div className="bg_image_part">
            <img src="Images/bglandingpage2x.png" className="bg_image" />
            <p className="gridServices_underline">Grid Services</p>
            <h1 className="line_intake">Intake Portal</h1>
            <form id="form" action="" onSubmit={this.handleSubmit} noValidate>
              <h1>Sign In</h1>
              <p className="enlighten">
                Use your Enlighten Manager credentials to submit applications on
                behalf of homeowners
              </p>

              <div className="input-control">
                <label className="label_part" htmlFor="email">
                  Email Address
                </label>
                <input
                  ref={(ref) => {
                    this.email = ref;
                  }}
                  id="email"
                  name="email"
                  type="text"
                  noValidate
                  onChange={this.handleChange}
                  required
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>

              <div className="input-control">
                <label className="label_part" htmlFor="password">
                  Password
                </label>
                <input
                  ref={(ref) => {
                    this.password = ref;
                  }}
                  id="password"
                  name="password"
                  type="password"
                  noValidate
                  onChange={this.handleChange}
                  required
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
              </div>

              <div className="link">
                <p className="form-items">
                  <a
                    className="form__link"
                    href="https://enlighten-qa4.enphaseenergy.com/manager/registration"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sign Up
                  </a>
                  <a
                    className="form__links"
                    href="https://enlighten-qa4.enphaseenergy.com/forgot_password"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Forgot Password?
                  </a>
                </p>
              </div>

              <button className="submit" id="submit"  >
                Sign In
              </button>
              {/* onClick={(e)=>this.setState({isOpen:true})} */}
               <Dialog isOpen={this.state.isOpen} onClose={(e) => this.setState({ isOpen: false })}>
         Please Enter Valid Email Address and Password !
        </Dialog>
            </form>
          </div>
        </div>

        {/* footer part */}
        <div className="footer_part">
          <img src="Images/Image 239@2x.png" className="logo_enphase" />
          <h3 className="copyright">
            ©2008-2021 Enphase Energy Inc. All rights reserved.{" "}
            <a
              href="https://www4.enphase.com/en-us/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy{" "}
            </a>
            |{" "}
            <a
              href="https://www4.enphase.com/en-us/legal/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms
            </a>
          </h3>
        </div>
      </div>
    );
  }
}

export default App;
