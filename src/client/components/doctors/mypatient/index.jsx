import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IMG01, IMG02, IMG03, IMG04, IMG05, IMG06, IMG07, IMG08, IMG012  } from './img';
import DoctorSidebar from '../sidebar';

class MypPatient extends Component{
	constructor(props) {
        super(props);
        this.state = {
            patients: [], // Initialize an empty array to store patient data
        };
    }

    componentDidMount() {
        // Fetch patient data when the component mounts
        this.fetchPatients();
    }

    fetchPatients() {
		// Make a GET request to the API endpoint
		fetch('http://127.0.0.1:8082/api/v1/doctor-patient')
			.then((response) => response.json())
			.then((data) => {
				// Update the state with the fetched patient data
				console.log(data);
				this.setState({ patients: data.Patients || [] });
			})
			.catch((error) => {
				console.error('Error fetching patient data:', error);
			});
	}

    render(){
		const { patients } = this.state;
		
		// console.log(patients);
        return(
            <div>
             
			<div className="breadcrumb-bar">
				<div className="container-fluid">
					<div className="row align-items-center">
						<div className="col-md-12 col-12">
							<nav aria-label="breadcrumb" className="page-breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item"><Link to="/home">Home</Link></li>
									<li className="breadcrumb-item active" aria-current="page">My Patients</li>
								</ol>
							</nav>
							<h2 className="breadcrumb-title">My Patients</h2>
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
						
							<div className="row row-grid">
								{patients.map((patient) => (
									<div key={patient.first_name} className="col-md-6 col-lg-4 col-xl-3">
										<div className="card widget-profile pat-widget-profile">
											{/* Render patient information based on the fetched data */}
											<div className="card-body">
												<div className="pro-widget-content">
													<div className="profile-info-widget">
														{/* Update link path and image source accordingly */}
														<Link to={`/doctor/patient-profile/${patient.first_name}`} className="booking-doc-img">
															{/* Use actual image source or default image */}
															<img src={patient.image_url} alt="User" />
														</Link>
														<div className="profile-det-info">
															<h3>
																<Link to={`/doctor/patient-profile/${patient.first_name}`}>
																	{`${patient.first_name} ${patient.last_name}`}
																</Link>
															</h3>
															<div className="patient-details">
																<h5>
																<b>Email :</b> {patient.email}
																</h5>
																<h5 className="mb-0">
																	<i className="fas fa-map-marker-alt"></i> {`${patient.city}, ${patient.country}`}
																</h5>
															</div>
														</div>
													</div>
												</div>
												<div className="patient-info">
													<ul>
														<li>
															Phone <span>{patient.phone_number}</span>
														</li>
														<li>
															Gender <span>{patient.gender}</span>
														</li>
														<li>
															Date of Birth <span>{patient.dob}</span>
														</li>
														<li>
															Hospital <span>{patient.hospital}</span>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>

						</div>
					</div>

				</div>

			</div>	
            </div>
        );
    }
}
export default MypPatient;