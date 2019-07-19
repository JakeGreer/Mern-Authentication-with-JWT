import React, { Component } from "react";
import { Row, Col, Input, InputGroup } from 'reactstrap';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (  
        <div className="d-flex justify-content-center h-100  login-container">
            <div className="card off-font">
                <div className="card-header text-left">
                <h3>Sign In</h3>
                <div className="d-flex justify-content-end social_icon">
                    <span><i className="fab fa-facebook-square"></i></span>
                    <span><i className="fab fa-google-plus-square"></i></span>
                    <span><i className="fab fa-twitter-square"></i></span>
                </div>
                {this.state.successMessage && <div className="alert alert-success">{this.state.successMessage}</div>}
                </div>
                <div className="card-body">
                <form noValidate onSubmit={this.onSubmit}>
                    <InputGroup className="form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                        </div>
                        <Input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            placeholder="email"
                            className={classnames("", {
                                invalid: errors.email || errors.emailnotfound
                            })}
                        />
                        <span className="text-red">
                            {errors.email}
                            {errors.emailnotfound}
                        </span>
                    </InputGroup>
                    <Row>
                        <Col size="md-12">
                        </Col>
                    </Row>
                    <InputGroup className="form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                        </div>
                        <Input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                            placeholder="password"
                            className={classnames("", {
                                invalid: errors.password || errors.passwordincorrect
                            })}
                        />
                        <span className="red-text">
                            {errors.password}
                            {errors.passwordincorrect}
                        </span>
                    </InputGroup>
                    <div className="form-group">
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            type="submit"
                            className="btn float-right login_btn"
                            >
                            Login
                        </button>
                    </div>
                </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                        Don't have an account?<Link to="/register">Sign Up</Link>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Link to="#">Forgot your password?</Link>
                    </div>
                </div>
            </div>
            {/* <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
            </Link> */}
        </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
