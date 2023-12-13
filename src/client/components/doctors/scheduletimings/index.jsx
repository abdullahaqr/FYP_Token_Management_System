import React, { Component } from 'react';
import DoctorSidebar from '../sidebar';
import Slot from './slot';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import {Tab, Tabs, Modal } from 'react-bootstrap';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const weekdays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
class ScheduleTiming extends Component {
    constructor(props) {
        super(props);
        this.state = {
          key: 1,
          activeModal: null,
          selectedOption: null,
          slotDurations: [], // New state to store slot durations from the API
          users: [{ id: "", hospital: "", slot:"" }],
        };
        this.handleSelect = this.handleSelect.bind(this);
      }
    
    componentDidMount() {
    // Fetch data from the API when the component mounts
        fetch('http://127.0.0.1:8000/api/v1/hospitals')
            .then((response) => response.json())
            .then((data) => {
            // Assuming the API response contains an array of hospitals
            const formattedData = data.map((hospital) => ({
                value: hospital.id,
                label: `${hospital.user.first_name} ${hospital.user.last_name}`,
            }));
        
            this.setState({ slotDurations: formattedData });
            })
            .catch((error) => {
            console.error('Error fetching hospitals:', error);
            });
        
        fetch('http://127.0.0.1:8000/api/v1/doctor-hospital-schedule/1')
            .then((response) => response.json())
            .then((scheduleData) => {
                console.log(scheduleData);
                this.setState({
                    scheduleData: scheduleData,
                });
            })
            .catch((error) => {
                console.error('Error fetching schedule data:', error);
            });
    }

    handleSelect (key) {
       
        this.setState({key})
    }
    openModal= (id)=> {
        this.setState({activeModal: id}, () => {
           
            }); 
    }
    handleCloseModal = () => {
        this.setState({activeModal: false}, () => {
            
        }); 
    };
    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    removeClick=(e, i)=>{
        e.preventDefault();
        let users = [...this.state.users];
        users.splice(i, 1);
        this.setState({ users });
    }
    handleDelete = (id) => {
        const { scheduleData } = this.state;
        console.log(id);
        console.log(scheduleData.data);
        const updatedData = scheduleData.data.filter(item => item.hospital_id !== id);
        this.setState({ scheduleData: { data: updatedData }  });
        console.log(scheduleData);
    };


    handleTimeDelete = (id) => {
        const { scheduleData } = this.state;
        const updatedData = scheduleData.data.filter(item => item.hospital_id !== id);
        this.setState({ scheduleData: { data: updatedData }  });
    };

    handleTimeDelete = (hospitalId, weekday, timeSlotId) => {
        const { scheduleData } = this.state;
    
        // Find the hospital in the data
        const hospitalIndex = scheduleData.data.findIndex(
            (hospital) => hospital.hospital_id === hospitalId
        );
    
        // Check if the hospital exists
        if (hospitalIndex === -1) {
            console.error(`Hospital with ID ${hospitalId} not found.`);
            return;
        }
    
        // Find the doctor in the hospital
        const doctorIndex = scheduleData.data[hospitalIndex].Doctor.findIndex(
            (doctor) => weekdays[doctor.weekday] === weekday
        );
    
        // Check if the doctor exists
        if (doctorIndex === -1) {
            console.error(`Doctor with weekday ${weekday} not found in hospital ${hospitalId}.`);
            // Handle this case as needed for your application
            return;
        }
    
        // Check if time_slots array exists
        if (!scheduleData.data[hospitalIndex].Doctor[doctorIndex].time_slots) {
            console.error(`No time_slots found for doctor with weekday ${weekday} in hospital ${hospitalId}.`);
            return;
        }
    
        // Find the time slot in the doctor's time_slots array
        const timeSlotIndex = scheduleData.data[hospitalIndex].Doctor[doctorIndex].time_slots.findIndex(
            (slot) => slot.id === timeSlotId
        );
    
        // Check if the time slot exists
        if (timeSlotIndex === -1) {
            console.error(`Time slot with ID ${timeSlotId} not found for doctor with weekday ${weekday} in hospital ${hospitalId}.`);
            return;
        }
    
        // Remove the time slot
        scheduleData.data[hospitalIndex].Doctor[doctorIndex].time_slots.splice(
            timeSlotIndex,
            1
        );
    
        // Update the state
        this.setState({
            scheduleData: {
                data: [...scheduleData.data], // Create a new array to trigger a re-render
            },
        });
        console.log(scheduleData);
    };
    




    addClick(){
        this.setState(prevState => ({ 
           users: [...prevState.users, { id: "", hospital: "", slot:"" }]
        }))
      }

    createUI(){
        const { selectedOption, slotDurations, scheduleData } = this.state;

        if (!scheduleData) {
            // If scheduleData is undefined, return or render appropriate content
            return <div>Loading schedule data...</div>;
        }

        const slotOptions = slotDurations.map((duration) => ({
            value: duration, // Adjust this based on the actual structure of your API response
            label: duration, // Adjust this based on the actual structure of your API response
          }));
          return scheduleData.data.map((schedule, i) =>
            
                <div key={schedule.hospital_id} className="col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Schedule Timings</h4>
                            <div className="profile-box">
                                <div className="row">

                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Timing Slot Duration</label>
                                                <Select
                                                    value={selectedOption}
                                                    onChange={this.handleChange}
                                                    isSearchable={true}
                                                    options={slotDurations}
                                                />
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card schedule-widget mb-0">
                                            <div className="schedule-header">
                                                < div className="schedule-nav">
                                                    <Tabs
                                                        className="tab-view"
                                                        activeKey={this.state.key}
                                                        onSelect={this.handleSelect}
                                                        id={"controlled-tab-example-" + schedule.hospital_id}
                                                    >
                                       
                                        {weekdays.map((weekday, index) => (
                                            <Tab key={weekday + index} className="nav-item" eventKey={weekday +(index + 1)} title={weekday}>
												<h4 className="card-title d-flex justify-content-between">
													<span>Time Slots</span> 
                                                    <a className="edit-link" data-toggle="modal" href="#edit_time_slot" onClick={()=>this.openModal('edit')}><i className="fa fa-edit mr-1"></i>Edit</a>
                                                </h4>
                                                {schedule.Doctor.map((doct, docIndex) => (
                                                    weekdays[doct.weekday] === weekday ? (
                                                        <div key={docIndex} className="doc-times">
                                                            {doct.time_slots.length > 0 ? (
                                                                doct.time_slots.map((timeSlot, timeIndex) => (
                                                                    <div key={timeSlot.id} className="doc-slot-list">
                                                                        {timeSlot.start_time} - {timeSlot.end_time}
                                                                        <a href="#0" className="delete_schedule" onClick={e => this.handleTimeDelete(schedule.hospital_id, weekdays[doct.weekday], timeSlot.id)}>
                                                                            <i className="fa fa-times"></i>
                                                                        </a>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p key={docIndex} className="text-muted mb-0">Not Available</p>
                                                            )}
                                                        </div>
                                                        ) : null
                                                ))}
                                                        
											</Tab>
                                        ))}
                                                    </Tabs>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {  parseInt(i) !== 0 ? 
                                <div className="delete-icon">
                                    <label className="d-md-block d-sm-none d-none">&nbsp;</label>
                                    <a href="#0" className="btn btn-danger trash" style={{width:'110px'}} onClick={e => this.handleDelete(schedule.hospital_id)}>
                                        <i style={{marginRight:'5px'}} className="far fa-trash-alt"></i> Delete</a>
                                </div>: ''
                            }
                        </div>
                    </div>
                    
                </div>
                            
        );
    }
    
    render() {
        return (
            <div>
                <div className="breadcrumb-bar">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-md-12 col-12">
                                <nav aria-label="breadcrumb" className="page-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Schedule Timings</li>
                                    </ol>
                                </nav>
                                <h2 className="breadcrumb-title">Schedule Timings</h2>
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
                                <div className="row">
                                    {this.createUI()}
                                    <div className="add-more" style={{padding:'15px 15px', margin: '0 15px 0 15px', background: 'white', width: '100%'}}>
                                        <a href="#0" className="add-experience" onClick={this.addClick.bind(this)}><i className="fa fa-plus-circle"></i> Add More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal for add slot*/}
				<Modal show={this.state.activeModal === 'add'} onHide={this.handleCloseModal} centered>
                    <Modal.Header>
                        <h5 className="modal-title">Add Time Slots</h5>
                    </Modal.Header>
                    <Modal.Body>	
                    <form>
				         <Slot />
							<div className="submit-section text-center">
								<button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
							</div>
						</form>
                    </Modal.Body>
                 </Modal>  
                 {/* modal for edit slot*/}
				<Modal show={this.state.activeModal === 'edit'} onHide={this.handleCloseModal} centered>
                    <Modal.Header>
                      <h5 className="modal-title">Edit Time Slots</h5>
                    </Modal.Header>
                    <Modal.Body>
                    <form>
					      <Slot />
							
							<div className="submit-section text-center">
								<button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
							</div>
						</form>
                    </Modal.Body>
                </Modal>	 	
            </div>

            
        );
    }
}

export default ScheduleTiming;