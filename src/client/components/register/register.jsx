import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import loginBanner from '../../assets/images/login-banner.png';
// import axios from 'axios';
import config from "config";

class Register extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
    };

    componentDidMount(){
        document.body.classList.add('account-page');
    }
    componentWillUnmount(){
		document.body.classList.remove('account-page');
	}

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/api/v1/sign-up', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone_number: this.state.phone_number,
            password: this.state.password,
            role: "2", //hospital
        }),
		})
		.then(response => response.json())
		.then(data => {
	
			// Redirect to the desired page, e.g., home
			window.location.href = `${config.publicPath}/login`;
		})
		.catch(error => {
		  console.error('Error during login:', error);
		});
    
    
        // try {
        //     const response = await fetch(apiUrl, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             first_name: this.state.first_name,
        //             last_name: this.state.last_name,
        //             email: this.state.email,
        //             phone_number: this.state.phone_number,
        //             password: this.state.password,
        //             role: "2", //hospital
        //         }),
        //     });
    
        //     if (!response.ok) {
        //         // Handle non-successful response
        //         throw new Error(`HTTP error! Status: ${response.status}`);
        //     }
    
        //     const responseData = await response.json();
    
        //     // Handle the response as needed, e.g., show a success message
        //     console.log('API response:', responseData);
    
        //     // Set redirect to true
        //     this.setState({ redirect: true });
    
        // } catch (error) {
        //     // Handle errors, e.g., show an error message
        //     console.error('API error:', error);
        // }
    };
    render(){
        if (this.state.redirect) {
            return <Redirect to="/login" />;
        }
        return(
            <div className="content" style={{padding: '100px 0 50px 0'}}>
            <div className="container-fluid">
                
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                            
                  
                        <div className="account-content">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-7 col-lg-6 login-left">
                                <img src={loginBanner} className="img-fluid" alt="Doccure Register" />	
                                </div>
                                <div className="col-md-12 col-lg-6 login-right">
                                    <div className="login-header">
                                        <h3>Hospital Register <Link to="/doctor/doctor-register" >Are you a Doctor?</Link></h3>
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
                                            <label className="focus-label" htmlFor="password">Create Password</label>
                                        </div>
                                        <div className="text-right">
                                            <Link to="/login"className="forgot-link">Already have an account?</Link>
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
        )
    }
}

export default Register;