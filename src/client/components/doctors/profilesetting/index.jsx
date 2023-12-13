import React, { Component } from 'react';
import DoctorSidebar from '../sidebar/index';
import IMG01 from '../../../assets/images/doctor-thumb-02.jpg';
import IMG02 from '../../../assets/images/feature-01.jpg';
import IMG03 from '../../../assets/images/feature-02.jpg';
import ReactTagsInput from './tags.jsx';
import Education from './education';
import Experience from './experience';
import Award from './award';
import SpecializationTagsInput from './tags_specialization.jsx';
import Memberships from './membership';
import {DropzoneArea} from 'material-ui-dropzone'
import Registration from './registration';
//import Registrations from './registration';

// const KeyCodes = {
// 	comma: 188,
// 	enter: 13,
//   };
   
//const delimiters = [KeyCodes.comma, KeyCodes.enter];
const accessToken = localStorage.getItem('access_token');
const user_id = localStorage.getItem('u_id');
const role = localStorage.getItem('role');
const dhp_id = localStorage.getItem('dhp_id');


class ProfileSetting extends Component {
	constructor(props) {
		super(props)
		this.state = {
			about: '',
			user: {
				first_name: '',
				last_name: '',
				email: '',
				dob: '',
				gender: 1, // Assuming 0 is the default value
				city: '',
				address: '',
				address_2: '',
				country: '',
				postal_code: '',},
			education: [],
			experience: [],
			awards: [],
			services: [],
			specializations: [],
			showSuccessPopup: false,
		};
	}

	handleChange(files){
		this.setState({
			files: files
		});
	}

	componentDidMount() {
	
		// Fetch data from the API
		fetch(`http://127.0.0.1:8000/api/v1/doctors/${dhp_id}`, {
				headers: {
				Authorization: `Bearer ${accessToken}`,
				},
		 	})
			.then((response) => response.json())
			.then((data) => {
			this.setState({
				about: data.about,
				user: data.user,
				education: data.education || [],
				experience: data.experience || [],
				awards: data.awards || [],
				services: data.service || [],
				specializations: data.specialization || [],
			});
			})
			.catch((error) => {
			console.error('Error fetching data:', error);
			});
	}

	handleSaveChanges = () => {
		const { about, user, education, experience, awards, services, specializations } = this.state;
		// const edu = [];
		const educationData = education.map(edu => ({
			id:edu.id,
			degree: edu.degree,
			college_institute: edu.college_institute,
			year_of_completion: edu.year_of_completion,
		}));
		const experienceData = experience.map(exp => ({
			id:exp.id,
			hospital_Name: exp.hospital_Name,
			from_year: exp.from_year,
			to_year: exp.to_year,
			Designation: exp.Designation,
		}));
		const awardsData = awards.map(awd => ({
			id: awd.id,
			award_Name: awd.award_Name,
			award_year: awd.award_year,
		}));
		const servicesData = services.map(ser => ({
			id: ser.id,
			service_name: ser.service_name,
		}));
		const specializationData = specializations.map(spe => ({
			id: spe.id,
			specialization_name: spe.specialization_name,
		}));

		const data = {
		  user: {
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			dob: user.dob,
			gender: user.gender,
			city: user.city,
			address: user.address,
			address_2: user.address_2,
			country: user.country,
			postal_code: user.postal_code,
		  },
		  about: about,
		  education: educationData,
		  experience: experienceData,
		  awards: awardsData,
		  service: servicesData, // assuming 'services' should be named 'service' in the API payload
		  specialization: specializationData,
		};
	
		fetch(`http://127.0.0.1:8000/api/v1/doctors/${dhp_id}`, {
		  method: 'PUT',
		  headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		  },
		  body: JSON.stringify(data),
		})
		  .then((response) => response.json())
		  .then((responseData) => {
			// Handle success response
			console.log('Data updated successfully:', responseData);
			this.setState({ showSuccessPopup: true });

       		 // Hide success popup after a certain time (e.g., 3000 milliseconds)
			setTimeout(() => {
				this.setState({ showSuccessPopup: false });
			}, 3000);
		  })
		  .catch((error) => {
			// Handle error
			console.error('Error updating data:', error);
		  });
	};

	handleInputChange = (e) => {
		const { name, value } = e.target;
		this.setState((prevState) => ({
		  user: {
			...prevState.user,
			[name]: value,
		  },
		}));
	};
	handleAboutChange = (e) => {
		const { name, value } = e.target;
		this.setState((prevState) => ({
		  about: value,
		}));
	};
	handleEducationChange = (educationData) => {
		this.setState({ education: educationData });
	};
	
	handleExperienceChange = (experienceData) => {
		this.setState({ experience: experienceData });
	};
	handleAwardChange = (awardsData) => {
		this.setState({ awards: awardsData });
	};
	
	handleServiceChange = (servicesData) => {
		this.setState({ services: servicesData });
	};
	
	handleSpecializationChange = (specializationData) => {
		this.setState({ specializations: specializationData });
	};

	// handleImage(files) {
	// 	this.setState({
	// 	  selectedFile: files[0],
	// 	});
	//   }
	// handleImage(files) {
	// 	console.log(files[0]);
	// 	this.setState({
	// 	  selectedFile: files[0],
	// 	}, () => {
	// 	  // Call handleSaveChanges when a file is selected
	// 	  this.handleImageChanges();
	// 	});
	// }

	handleImage(files) {
		if (files && files.length > 0) {
		  console.log(files[0]);
		  this.setState({
			selectedFile: files[0],
		  }, () => {
			// Call handleSaveChanges when a file is selected
			this.handleImageChanges();
		  });
		}
	  }
	
	  handleImageChanges = () => {
		// Existing code for saving changes...
	
		const formData = new FormData();
		formData.append('image_url', this.state.selectedFile);
		// Assuming you are using the fetch API for the API request
		fetch(`http://127.0.0.1:8000/api/v1/image/${user_id}`, {
		  method: 'PUT',headers: {
			'Authorization': `Bearer ${accessToken}`,
		  },
		  body: formData,
		})
		  .then((response) => response.json())
		  .then((data) => {
			const newImageUrl = data.image_url;
			// Update the user's image URL in your state or wherever it's stored
			const newUser = { ...this.state.user, image_url: newImageUrl };
			this.setState({ user: newUser });
		  })
		  .catch((error) => {
			console.error('Error uploading image:', error);
		  });
	  };
	
	
    render(){
		const { about, user, education, experience, awards, services, specializations, showSuccessPopup } = this.state;
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
						
						<DoctorSidebar />
							
						</div>
						<div className="col-md-7 col-lg-8 col-xl-9">
						
						
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Basic Information</h4>
									<div className="row form-row">
										<div className="col-md-12">
											<div className="form-group">
												<div className="change-avatar">
													<div className="profile-img">
														<img src={user.image_url} value={user.image_url} alt="User"/>
													</div>
													<div className="upload-img">
														<div className="change-photo-btn">
															<span><i className="fa fa-upload"></i> Upload Photo</span>
															<input type="file" className="upload" onChange={(e) => this.handleImage(e.target.files)} />
														</div>
														<small className="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
													</div>
												</div>
											</div>
										</div>
										{/* <div className="col-md-6">
											<div className="form-group">
												<label>Username <span className="text-danger">*</span></label>
												<input type="text" className="form-control" readOnly />
											</div>
										</div> */}
										
										<div className="col-md-6">
											<div className="form-group">
												<label>First Name <span className="text-danger">*</span></label>
												<input type="text" name='first_name' className="form-control" value={user.first_name} onChange={this.handleInputChange} />
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label>Last Name <span className="text-danger">*</span></label>
												<input type="text" name='last_name' className="form-control" value={user.last_name} onChange={this.handleInputChange}/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label>Email <span className="text-danger">*</span></label>
												<input type="email" name='email' className="form-control" value={user.email} readOnly/>
											</div>
										</div>
										{/* <div className="col-md-6">
											<div className="form-group">
												<label>Phone Number</label>
												<input type="text" name='' className="form-control" />
											</div>
										</div> */}
										<div className="col-md-6">
											<div className="form-group">
												<label>Gender</label>
												<select className="form-control select" name='gender' value={user.gender} onChange={this.handleInputChange}>
													<option value={0}>Select</option>
													<option value={1}>Male</option>
													<option value={2}>Female</option>
												</select>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group mb-0">
												<label>Date of Birth</label>
												<input type="date" className="form-control" name='dob' value={user.dob} onChange={this.handleInputChange}/>
											</div>
										</div>
									</div>
								</div>
							</div>
						
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">About Me</h4>
									<div className="form-group mb-0">
										<label>Biography</label>
										<textarea className="form-control" rows="5" name='about' value={about} onChange={this.handleAboutChange}></textarea>
									</div>
								</div>
							</div>
						
							<div className="card contact-card">
								<div className="card-body">
									<h4 className="card-title">Contact Details</h4>
									<div className="row form-row">
										<div className="col-md-6">
											<div className="form-group">
												<label>Address Line 1</label>
												<input type="text" className="form-control" name='address' value={user.address} onChange={this.handleInputChange}/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="control-label">Address Line 2</label>
												<input type="text" className="form-control" name='address_2' value={user.address_2} onChange={this.handleInputChange}/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="control-label">City</label>
												<input type="text" className="form-control" name='city' value={user.city} onChange={this.handleInputChange}/>
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group">
												<label className="control-label">Country</label>
												<input type="text" className="form-control" name='country' value={user.country} onChange={this.handleInputChange}/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="control-label">Postal Code</label>
												<input type="text" className="form-control" name='postal_code' value={user.postal_code} onChange={this.handleInputChange}/>
											</div>
										</div>
									</div>
								</div>
							</div>
					
							<div className="card services-card">
								<div className="card-body">
									<h4 className="card-title">Services and Specialization</h4>
									<div className="form-group">
										<label>Services</label>
										<ReactTagsInput key='tag1' servicesData={services} onChange={this.handleServiceChange}/>
									</div> 
									<div className="form-group mb-0">
										<label>Specialization </label>
										<SpecializationTagsInput key='tag2' specializationData={specializations} onChange={this.handleSpecializationChange}/>
									</div> 
								</div>              
							</div>
						
						<Education educationData={education} onChange={this.handleEducationChange} />
						<Experience experienceData={experience}  onChange={this.handleExperienceChange} />
						<Award awardsData={awards} onChange={this.handleAwardChange}/>
							
							{showSuccessPopup && (
								<div className="alert alert-success alert-dismissible fade show" role="alert">
									<strong>Success!</strong> Your <a href="#" className="alert-link">profile</a> has been successfully updated.
									<button type="button" className="close" data-dismiss="alert" aria-label="Close">
									<span aria-hidden="true">×</span>
									</button>
								</div>
							)}			
							
							<div className="submit-section submit-btn-bottom">
								<button type="submit" className="btn btn-primary submit-btn" onClick={this.handleSaveChanges}>Save Changes</button>
							</div>
							
						</div>
					</div>
				</div>
			</div>	
        </div>
        );
    }
}

export default ProfileSetting;