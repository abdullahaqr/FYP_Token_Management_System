import React, { Component } from 'react';
import loginBanner from '../../../assets/images/login-banner.png';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class DoctorRegister extends Component {
	state = {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
    };

    componentDidMount() {
        document.getElementsByTagName('body')[0].className = 'account-page';
    }
    
    componentWillUnmount() {
        document.getElementsByTagName('body')[0].className = '';
    }

	handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleFormSubmit = async (e) => {
        e.preventDefault();

        // const apiUrl = 'http://127.0.0.1:8082/api/v1/sign-up';
        const apiUrl = 'http://127.0.0.1:8000/api/v1/sign-up';

        try {
            const response = await axios.post(apiUrl, {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                phone_number: this.state.phone_number,
                password: this.state.password,
                role:"3", //doctor
            });

            // Handle the response as needed, e.g., show a success message
            console.log('API response:', response.data);

            // Set redirect to true
            this.setState({ redirect: true });

        } catch (error) {
            // Handle errors, e.g., show an error message
            console.error('API error:', error);
        }
    };

    render(){
		if (this.state.redirect) {
            return <Redirect to="/login" />;
        }
        return(
                	<div className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-8 offset-md-2">
						
						
							<div className="account-content">
								<div className="row align-items-center justify-content-center">
									<div className="col-md-7 col-lg-6 login-left">
										<img src={loginBanner} className="img-fluid" alt="Login Banner" />	
									</div>
									<div className="col-md-12 col-lg-6 login-right">
										<div className="login-header">
											<h3>Doctor Register <Link to="/register">Not a Doctor?</Link></h3>
										</div>
										
									
										<form onSubmit={this.handleFormSubmit}>
											<div className="form-group form-focus">
												<input type="text" className="form-control floating" id="first_name" onChange={this.handleInputChange} />
												<label className="focus-label" htmlFor="first_name">First Name</label>
											</div>
											<div className="form-group form-focus">
												<input type="text" className="form-control floating" id="last_name" onChange={this.handleInputChange} />
												<label className="focus-label" htmlFor="last_name">Last Name</label>
											</div>
											<div className="form-group form-focus">
												<input type="email" className="form-control floating" id="email" onChange={this.handleInputChange} />
												<label className="focus-label" htmlFor="email">Email</label>
											</div>
											<div className="form-group form-focus">
												<input type="text" className="form-control floating" id="phone_number" onChange={this.handleInputChange} />
												<label className="focus-label" htmlFor="phone_number">Mobile Number</label>
											</div>
											<div className="form-group form-focus">
												<input type="password" className="form-control floating" id="password" onChange={this.handleInputChange} />
												<label className="focus-label"  htmlFor="password">Create Password</label>
											</div>
											<div className="text-right">
												<Link to="/login" className="forgot-link">Already have an account?</Link>
											</div>
											<button className="btn btn-primary btn-block btn-lg login-btn" type="submit">Signup</button>
											<div className="login-or">
												<span className="or-line"></span>
												<span className="span-or">or</span>
											</div>
											<div className="row form-row social-login">
												<div className="col-6">
													<a href="#0" className="btn btn-facebook btn-block"><i className="fab fa-facebook-f mr-1"></i> Login</a>
												</div>
												<div className="col-6">
													<a href="#0" className="btn btn-google btn-block"><i className="fab fa-google mr-1"></i> Login</a>
												</div>
											</div>
										</form>
									
										
									</div>
								</div>
							</div>
							
								
						</div>
					</div>

				</div>

			</div>	
        );
    }
}

export default DoctorRegister;