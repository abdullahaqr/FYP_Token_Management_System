import React, { Component } from 'react';
import loginBanner from '../../assets/images/login-banner.png';
import { Link } from 'react-router-dom';
import config from "config";
// import axios from 'axios';

class ForgotPassword  extends Component {  
	constructor(props) {
		super(props);
		this.state = {
		  email: '',
		  successMessage: '',
		};
	}

	handleEmailChange = (e) => {
	this.setState({ email: e.target.value });
	};

	handleFormSubmit = async (e) => {
		e.preventDefault();
	
		try {
		//   const response = await axios.post(
		// 	'',
		// 	{ email: this.state.email }
		//   );
		  fetch(`http://127.0.0.1:8000/api/v1/users/forgot-password`, {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
			email: this.state.email,
		  }),
		})
		  .then((response) => {
				if (!response.ok) {
					alert('Email Not Registered');
					throw new Error('Email Not Registered');
				}
				return response.json();
		   })
		  .then((data) => {
			console.log('API response:', data);
			// Handle success or error accordingly
			
			this.setState({ successMessage: 'Password send on registered email address!' });
      		// alert('Password send on register email address!');
			this.setState({
				email: '',
			});
		  })
		  .catch((error) => {
			console.error('Error making API call:', error);
			// Handle error
		  });
	
		  // Assuming the API returns a success message
	
		  // You can also show the success message in an alert
		//   alert(response.data.message);
		} catch (error) {
		  console.error('Error sending reset password request:', error);
		  // Handle error and display an error message if needed
		}
	};

	componentDidMount(){
		document.body.classList.add('account-page');
	}
	componentWillUnmount(){
		document.body.classList.remove('account-page');
	}

 render(){
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
											<h3>Forgot Password?</h3>
											<p className="small text-muted">Enter your email to get a password reset link</p>
										</div>
									
										<form onSubmit={this.handleFormSubmit}>
											<div className="form-group form-focus">
												<input 
													type="email" 
													name="email"
													className="form-control floating" 
													value={this.state.email}
                									onChange={this.handleEmailChange}
												/>
												<label className="focus-label">Email</label>
												<span style={{color: 'red'}}>{this.state.successMessage}</span>
											</div>
											<div className="text-right">
												<Link to="/login" className="forgot-link">Remember your password? </Link>
											</div>
											<button className="btn btn-primary btn-block btn-lg login-btn" type="submit">Reset Password</button>
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

export default ForgotPassword;