import React,{ Component } from 'react';
import DashboardSidebar from '../sidebar/index';

const accessToken = localStorage.getItem('access_token');
const user_id = localStorage.getItem('u_id');

class Password extends Component{
	constructor(props) {
		super(props);
	
		this.state = {
		  password: '',
		  new_password: '',
		  confirmPassword: '',
		};
	  }
	
	  handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	  };
	
	  handleSubmit = (event) => {
		event.preventDefault();
	
		const { password, new_password, confirmPassword } = this.state;
		const userId = 5; // You may want to get the user ID dynamically
	
		// Check if new password and confirm password match
		if (new_password !== confirmPassword) {
		  alert("New password and confirm password don't match");
		  return;
		}
	
		// Make the API call
		fetch(`http://127.0.0.1:8000/api/v1/users/${user_id}/change-password`, {
		  method: 'PUT',
		  headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		  },
		  body: JSON.stringify({
			password,
			new_password,
		  }),
		})
		  .then((response) => {
				if (!response.ok) {
					alert('Invalid password');
					throw new Error('Invalid password');
				}
				return response.json();
		   })
		  .then((data) => {
			console.log('API response:', data);
			// Handle success or error accordingly
      		alert('Password changed successfully');
			
			this.setState({
				password: '',
				new_password: '',
				confirmPassword: '',
			});
		  })
		  .catch((error) => {
			console.error('Error making API call:', error);
			// Handle error
		  });
	  };

    render(){
        return(
            <div>
                <div className="breadcrumb-bar">
				<div className="container-fluid">
					<div className="row align-items-center">
						<div className="col-md-12 col-12">
							<nav aria-label="breadcrumb" className="page-breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item"><a href="/home">Home</a></li>
									<li className="breadcrumb-item active" aria-current="page">Profile Settings</li>
								</ol>
							</nav>
							<h2 className="breadcrumb-title">Profile Settings</h2>
						</div>
					</div>
				</div>
			</div>
            <div className="content">
				<div className="container-fluid">
					<div className="row">
					    <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                        < DashboardSidebar />
                       </div>

                       <div className="col-md-7 col-lg-8 col-xl-9">
                                <div className="card">
                                     <div className="card-body">
                                     <form onSubmit={this.handleSubmit}>
												<div className="form-group">
													<label>Old Password</label>
													<input 
														type="password" 
														className="form-control" 
														name="password"
														value={this.state.password}
														onChange={this.handleInputChange}
													/>
												</div>
												<div className="form-group">
													<label>New Password</label>
													<input
														type="password"
														className="form-control"
														name="new_password"
														value={this.state.new_password}
														onChange={this.handleInputChange}
													/>
												</div>
												<div className="form-group">
													<label>Confirm Password</label>
													<input
														type="password"
														className="form-control"
														name="confirmPassword"
														value={this.state.confirmPassword}
														onChange={this.handleInputChange}
													/>
												</div>
												<div className="submit-section">
													<button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
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
export default Password;   
        

