import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { Row, Col, Container, Input, Button } from 'reactstrap'
import './Register.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
        <Container className="register login-wrapper" fluid >
            <Row className="register-wrap">
                <Col md="4" className="register-left off-font">
                    <h3>Welcome!</h3>
                    <p>Already have an acount?</p>
                    <Link className="btn login-btn" to="/login">Login</Link><br/>
                </Col>
                <Col md="8" className="register-right">
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <h3 className="register-heading off-font">Register</h3>
                            <form noValidate onSubmit={this.onSubmit}>
                                <Row className="register-form">
                                    <Col md="12">
                                        { this.state.errors.message && <div className="alert alert-danger text-center">{this.state.errors.message}</div> }
                                        <div className="form-row">
                                            <Col md="6" className="form-group">
                                                <label htmlFor="lastName">First Name</label>
                                                <Input
                                                    onChange={this.onChange}
                                                    value={this.state.firstName}
                                                    error={errors.firstName}
                                                    id="firstName"
                                                    type="text"
                                                    className={classnames("", {
                                                        invalid: errors.firstName
                                                    })}
                                                />
                                                <span className="text-danger"><small>{errors.firstName}</small></span>
                                            </Col>
                                            <Col md="6" className="form-group">
                                                <label htmlFor="lastName">Last Name</label>
                                                <Input
                                                    onChange={this.onChange}
                                                    value={this.state.lastName}
                                                    error={errors.lastName}
                                                    id="lastName"
                                                    type="text"
                                                    className={classnames("", {
                                                        invalid: errors.lastName
                                                    })}
                                                />
                                                <span className="text-danger"><small>{errors.lastName}</small></span>
                                            </Col>
                                        </div>
                                        <div className="form-row">
                                            <Col md="12" className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <Input
                                                    onChange={this.onChange}
                                                    value={this.state.email}
                                                    error={errors.email}
                                                    id="email"
                                                    type="email"
                                                    className={classnames("", {
                                                        invalid: errors.email
                                                    })}
                                                />
                                                <span className="text-danger"><small>{errors.email}</small></span>
                                            </Col>
                                        </div>
                                        <div className="form-row">
                                            <Col md="6" className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <Input
                                                    onChange={this.onChange}
                                                    value={this.state.password}
                                                    error={errors.password}
                                                    id="password"
                                                    type="password"
                                                    className={classnames("", {
                                                        invalid: errors.password
                                                    })}
                                                />
                                                <span className="text-danger"><small>{errors.password}</small></span>
                                            </Col>
                                            <Col md="6" className="form-group">
                                                <label htmlFor="password2">Confirm Password</label>
                                                <Input
                                                    onChange={this.onChange}
                                                    value={this.state.password2}
                                                    error={errors.password2}
                                                    id="password2"
                                                    type="password"
                                                    className={classnames("", {
                                                        invalid: errors.password2
                                                    })}
                                                />
                                                <span className="text-danger"><small>{errors.password2}</small></span>
                                            </Col>
                                            <Col md="12" className="form-group">
                                                <Button
                                                    style={{
                                                        width: "150px",
                                                        borderRadius: "3px",
                                                        letterSpacing: "1.5px",
                                                        marginTop: "1rem"
                                                    }}
                                                    type="submit"
                                                    className="btnRegister btn off-font"
                                                >
                                                    Register
                                                </Button>
                                            </Col>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
