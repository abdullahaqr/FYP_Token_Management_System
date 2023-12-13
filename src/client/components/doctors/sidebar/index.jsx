import React,{ Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import IMG01 from '../../../assets/images/doctor-thumb-02.jpg';


const accessToken = localStorage.getItem('access_token');
const user_id = localStorage.getItem('u_id');
const role = localStorage.getItem('role');
class DoctorSidebar extends Component{
    constructor(props) {
        super(props);
        this.state = {
          doctorName: '',
          imageUrl: '',
          doctorEmail: '',
        };
    }
    
    componentDidMount() {

        if (accessToken) {
            this.fetchUserInfo(accessToken, user_id);
        }
    }


    fetchUserInfo(accessToken, user_id) {
        // Replace 'YOUR_USERINFO_ENDPOINT' with the actual userinfo endpoint provided by your OAuth server
        const userinfoEndpoint = `http://127.0.0.1:8000/api/v1/users/${user_id}/profile`;
    
        fetch(userinfoEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.image_url);
            const doctorName = `${data.first_name} ${data.last_name}`;
            const imageUrl = data.image_url;
            const doctorEmail = data.email;
            
            this.setState({
              doctorName,
              doctorEmail,
              imageUrl,
            });
            
          })
          .catch((error) => {
            console.error('Error fetching user info:', error);
          });
    }

    render(){
        const {doctorName, imageUrl, doctorEmail} = this.state;
        return(
            <div className="profile-sidebar">
                <div className="widget-profile pro-widget-content">
                    <div className="profile-info-widget">
                        <Link to="#" className="booking-doc-img">
                            <img src={imageUrl} alt="User" />
                        </Link>
                        <div className="profile-det-info">
                            <h3>{doctorName}</h3>
                            
                            <div className="patient-details">
                                <h5 className="mb-0">{doctorEmail}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-widget">
                   
                        
                    <Nav className="dashboard-menu">

                        <Nav.Item> 
                             <NavLink to="/doctor/doctor-dashboard"> 
                                <i className="fas fa-columns"></i>
                                    <span>Dashboard</span>
                             </NavLink>
                         </Nav.Item>
                         
                         <Nav.Item> 
                            <NavLink to="/doctor/appointments"  activeClassName="active">
                             <i className="fas fa-calendar-check"></i>
                                    <span>Appointments</span> 
                            </NavLink>
                        </Nav.Item> 

                            <Nav.Item> 
                              <NavLink to="/doctor/my-patients">
                                <i className="fas fa-user-injured"></i>
                                        <span>My Patients</span>
                                </NavLink>
                            </Nav.Item> 
                            <Nav.Item> 
                                <NavLink to="/doctor/schedule-timing">
                                <i className="fas fa-hourglass-start"></i>
                                        <span>Schedule Timings</span>
                                </NavLink>
                              </Nav.Item> 
                              <Nav.Item> 
                                <NavLink to="/pages/invoice">
                                        <i className="fas fa-file-invoice"></i>
                                        <span>Invoices</span>
                                </NavLink>
                               </Nav.Item> 
                               <Nav.Item> 
                                <NavLink to="/doctor/review">
                                    <i className="fas fa-star"></i>
                                    <span>Reviews</span>
                                </NavLink>
                                </Nav.Item> 
                                <Nav.Item> 
                            <NavLink to="/doctor/chat-doctor">
                                <i className="fas fa-comments"></i>
                                        <span>Message</span>
                                        <small className="unread-msg">23</small>
                            </NavLink>
                            </Nav.Item>  
                            <Nav.Item> 
                            <NavLink to="/doctor/profile-setting">
                                <i className="fas fa-user-cog"></i>
                                    <span>Profile Settings</span>
                            </NavLink> 
                            </Nav.Item> 
                            <Nav.Item> 
                            <NavLink to="/social-media">
                               <i className="fas fa-share-alt"></i>
                                    <span>Social Media</span>
                            </NavLink>   
                            </Nav.Item> 
                            <Nav.Item> 
                            <NavLink to="/doctor-change-passwword">
                                   <i className="fas fa-lock"></i>
                                    <span>Change Password</span>
                            </NavLink>
                            </Nav.Item> 
                            <Nav.Item> 
                              <NavLink to="/home" activeClassName="active">
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span>Logout</span>
                              </NavLink>
                              </Nav.Item> 
                              </Nav> 
                  
                </div>
            </div>
        );
    }
}
export default DoctorSidebar;
   