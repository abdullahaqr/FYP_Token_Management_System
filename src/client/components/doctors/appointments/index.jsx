import React, { Component } from "react";
import { Table, Select } from "antd";
const { Option } = Select;
import SidebarNav from "../sidebar";
import DoctorSidebar from '../sidebar';
import { Modal } from 'react-bootstrap';
import StickyBox from "react-sticky-box";
import {
  itemRender,
  onShowSizeChange,
} from "../../paginationfunction";
import {IMG01, IMG02, IMG03, IMG04, IMG05, IMG06, IMG07, IMG08, IMG010, IMG011} from './img';
import {Link} from "react-router-dom";
// Import your CSS file
import "./style2.css";


const accessToken = localStorage.getItem('access_token');
const role = localStorage.getItem('role');

class Appointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
        };
      }

    componentDidMount() {
      let  urlEndpoint = '';
      if(role == 3){
         urlEndpoint = 'http://127.0.0.1:8000/api/v1/doctor-appointment';
      }else if(role == 2){
         urlEndpoint = 'http://127.0.0.1:8000/api/v1/hospital-appointment';
      }
    // Fetch data from the API endpoint
    fetch(urlEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(response => response.json())
        .then(data => {
        // Update the component state with the fetched data
        this.setState({ data: data.Appointment });
        })
        .catch(error => {
        console.error("Error fetching data:", error);
        });
    }

    handleStatusChange = (recordId, value) => {
        const newData = this.state.data.map((record) => {
        if (record.id === recordId) {
            // Update the local state
            const updatedRecord = {
            ...record,
            status: value,
            };
    
            // Call the PATCH API to update the status
            fetch(`http://127.0.0.1:8000/api/v1/appointment/${recordId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: value,
            }),
            })
            .then(response => response.json())
            .then(updatedData => {
                // If the API call is successful, update the state with the new data
                const newData = this.state.data.map((item) =>
                item.id === recordId ? updatedRecord : item
                );
    
                this.setState({
                data: newData,
                });
                alert("Status Updated!");
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    
            return updatedRecord;
        }
        return record;
    });
}

  render() {
    const { data } = this.state;

    const columns = [
      {
        title: "Hospital Name",
        dataIndex: "hospital",
        render: (text, record) => (
          <h2 className="table-avatar">
            {/* <Link
              to="/admin/profile"
              className="avatar avatar-sm mr-2"
            >
              <img alt="" src={record.image} />
            </Link> */}
            <Link to="/admin/profile">{text}</Link>
          </h2>
        ),
        sorter: (a, b) => a.hospital.length - b.hospital.length,
      },
      {
        title: "Patient Name",
        dataIndex: "patient_name",
        render: (text, record) => (
          <h2 className="table-avatar">
            {/* <Link
              to="/admin/profile"
              className="avatar avatar-sm mr-2"
            >
              <img alt="" src={record.PatientImg} />
            </Link> */}
            <Link to="/admin/profile">{record.patient_name}</Link>
          </h2>
        ),
        sorter: (a, b) => a.patient_name.length - b.patient_name.length,
      },
      {
        title: "Booking Date",
        dataIndex: "time",
        render: (text, record) => (
          <>
            <span>{record.date}</span>
            <span className="text-primary d-block">Time: {text}</span>
          </>
        ),
        sorter: (a, b) => a.time.length - b.time.length,
      },
      {
        title: "Token No",
        dataIndex: "token_no",
        sorter: (a, b) => parseInt(a.token_no, 10) - parseInt(b.token_no, 10),
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (text, record) => (
          <Select
            defaultValue={text}
            onChange={(value) => this.handleStatusChange(record.id, value)}
          >
            <Option value="pending">Pending</Option>
            <Option value="confirmed">Confirmed</Option>
            <Option value="canceled">Canceled</Option>
            <Option value="completed">Completed</Option>
          </Select>
        ),
      },
    ];

    return (
      <>
        <div>
            <div className="breadcrumb-bar">
				<div className="container-fluid">
					<div className="row align-items-center">
						<div className="col-md-12 col-12">
							<nav aria-label="breadcrumb" className="page-breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item"><Link to="/home">Home</Link></li>
									<li className="breadcrumb-item active" aria-current="page">Appointments</li>
								</ol>
							</nav>
							<h2 className="breadcrumb-title">Appointments</h2>
						</div>
					</div>
				</div>
			</div>

            <div className="content">
				<div className="container-fluid">

					<div className="row">
						<div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                            <div className="appointments">
                            <StickyBox offsetTop={50} offsetBottom={20}>
                                  <DoctorSidebar />
                                  </StickyBox>
							</div>
                         </div>
                         <div className="col-md-7 col-lg-8 col-xl-9">
							<div className="appointments">
                                
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            {data.length > 0 ? (
                                                <Table
                                                  className="table-striped"
                                                  style={{ overflowX: "auto" }}
                                                  columns={columns}
                                                  dataSource={data}
                                                  rowKey={(record) => record.id}
                                                  showSizeChanger={true}
                                                  pagination={{
                                                    total: data.length,
                                                    showTotal: (total, range) =>
                                                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                    showSizeChanger: true,
                                                    onShowSizeChange: onShowSizeChange,
                                                    itemRender: itemRender,
                                                  }}
                                                />
                                            ) : (
                                                <p>No appointments available.</p>
                                            )}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
        
							</div>
                        </div>  
                    </div>
                </div> 
            </div>      

        </div>
       
      </>
    );
  }
}

export default Appointments;
