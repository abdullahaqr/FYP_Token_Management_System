import React, { Component } from 'react';

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [{ id: "", hospital_Name:"", from_year:"", to_year: "", Designation: "" }]
    };
    this.removeClick = this.removeClick.bind(this);
    this.addClick = this.addClick.bind(this);
  }

    removeClick = (e, i) => {
        e.preventDefault();
        let users = [...this.state.users];
        users.splice(i, 1);
        this.setState({ users });
    }

    addClick() {
        const { experienceData, onChange } = this.props;
      
        // Create a new array with the updated experienceData
        const updatedData = [...experienceData, { hospital_Name: "", from_year: "", to_year: "", Designation: "" }];
      
        // Notify the parent component about the change
        onChange(updatedData);
    }

    handleDelete = (id) => {
        const { experienceData, onChange } = this.props;
    
        const updatedData = experienceData.filter(item => item.id !== id);
      
        onChange(updatedData);
      };

    handleChange = (e, i) => {
        const { name, value } = e.target;
        const { onChange, experienceData } = this.props;
        const updatedData = experienceData.map((item, index) =>
        index === i ? { ...item, [name]: value } : item
        );
        onChange(updatedData);
    };
    createUI(){
        const { experienceData } = this.props;
        return experienceData.map((el, i) => (

        <div className="row form-row" key={i} id={'education' + i}>
                <div className="col-12 col-md-6 col-lg-4">
                <input type="hidden" className="form-control" name='id' value={el.id} onChange={(e) => this.handleChange(e, i)}/>
                    
                    <div className="form-group">
                        {/* <label>Degree</label> */}
                        <input type="text" className="form-control" placeholder='Hospital Name' name='hospital_Name' value={el.hospital_Name} onChange={(e) => this.handleChange(e, i)} />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-2">
                    <div className="form-group">
                        {/* <label>College/Institute</label> */}
                        <input type="text" className="form-control" placeholder='From Year' name='from_year' value={el.from_year} onChange={(e) => this.handleChange(e, i)} />
                    </div> 
                </div>
                <div className="col-12 col-md-6 col-lg-2">
                    <div className="form-group">
                        {/* <label>Year of Completion</label> */}
                        <input type="text" className="form-control" placeholder='To Year' name='to_year' value={el.to_year} onChange={(e) => this.handleChange(e, i)} />
                    </div> 
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="form-group">
                      {/* <label>Designation</label> */}
                      <input type="text" className="form-control" placeholder='Designation' name='Designation' value={el.Designation} onChange={(e) => this.handleChange(e, i)} />
                  </div> 
                </div>
            
    
            {  parseInt(i) !== -1 ? 
            <div className="col-12 col-md-6 col-lg-1">
                <div className="delete-icon">
                    {/* <label className="d-md-block d-sm-none d-none">&nbsp;</label> */}
                    <a href="#0" className="btn btn-danger trash" onClick={() => this.handleDelete(el.id)}>
                        <i className="far fa-trash-alt"></i></a>
                </div>  
                </div>: ''
            }
            </div> 
        
    ))
    }


  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Experience</h4>
          <div className="education-info">
            <div className="row form-row education-cont">
              <div className="col-12 col-md-10 col-lg-11">
                {/* <div className="row form-row">
                    <div className="col-3 col-md-3 col-lg-3">
                    <div style={{ padding: '10px 0px 2px '}}>
                        <label>Degree</label>
                    </div>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4">
                    <div style={{ padding: '10px 0px 2px '}}>
                        <label>College/Institute</label>
                    </div>
                    </div>
                    <div className="col-3 col-md-3 col-lg-4">
                    <div style={{ padding: '10px 0px 2px '}}>
                        <label>Year of Completion</label>
                    </div>
                    </div>
                </div> */}
                {/* {this.createdUI()} */}
                <div style={{ marginTop:'0.5rem'}}>
                    {this.createUI()}
                </div>
              </div>
            </div>
          </div>
          <div className="add-more">
            <a href="#0" className="add-education" onClick={this.addClick}>
              <i className="fa fa-plus-circle"></i> Add More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Experience;
