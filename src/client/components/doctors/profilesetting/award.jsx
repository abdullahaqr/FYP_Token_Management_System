import React, { Component } from 'react';

class Memberships extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [{ id: "", Awards: "", Year: "" }]
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
        const { awardsData, onChange } = this.props;
      
        // Create a new array with the updated awardsData
        const updatedData = [...awardsData, { Awards: "", Year: "" }];
      
        // Notify the parent component about the change
        onChange(updatedData);
    }

    handleDelete = (id) => {
        const { awardsData, onChange } = this.props;
    
        const updatedData = awardsData.filter(item => item.id !== id);
      
        onChange(updatedData);
      };

    handleChange = (e, i) => {
        const { name, value } = e.target;
        const { onChange, awardsData } = this.props;
        const updatedData = awardsData.map((item, index) =>
        index === i ? { ...item, [name]: value } : item
        );
        onChange(updatedData);
    };
    createUI(){
        const { awardsData } = this.props;
        return awardsData.map((el, i) => (

        <div className="row form-row" key={i} id={'awards' + i}>
                <div className="col-12 col-md-6 col-lg-5">
                <input type="hidden" className="form-control" name='id' value={el.id} onChange={(e) => this.handleChange(e, i)}/>
                    
                    <div className="form-group">
                        {/* <label>Degree</label> */}
                        <input type="text" className="form-control" placeholder='Award Name' name='award_Name' value={el.award_Name} onChange={(e) => this.handleChange(e, i)} />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-5">
                    <div className="form-group">
                        {/* <label>College/Institute</label> */}
                        <input type="text" className="form-control" placeholder='Award Year' name='award_year' value={el.award_year} onChange={(e) => this.handleChange(e, i)} />
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
          <h4 className="card-title">Awards</h4>
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

export default Memberships;
