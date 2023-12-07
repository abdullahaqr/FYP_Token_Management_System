import React, { Component } from 'react';

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [{ id: "", degree: "", college_institute: "", year_of_completion: "" }]
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

    // addClick() {
    //     console.log("Add Clicked"); 
    //     this.setState(prevState => ({
    //     users: [...prevState.educationData, { degree: "", college_institute: "", year_of_completion: "" }]
    //     }));
    // }
    addClick() {
        const { educationData, onChange } = this.props;
      
        // Create a new array with the updated educationData
        const updatedData = [...educationData, { degree: "", college_institute: "", year_of_completion: "" }];
      
        // Notify the parent component about the change
        onChange(updatedData);
    }
    // handleDelete = (id) => {
    //     document.getElementById('education'+id).style.display = 'none';
    // };
    handleDelete = (id) => {
        const { educationData, onChange } = this.props;
      
        // Filter out the object with the specified id
        const updatedData = educationData.filter(item => item.id !== id);
      
        // Notify the parent component about the change
        onChange(updatedData);
      };
    
//   createdUI() {
//     const { educationData } = this.props;

//     return educationData.map((el, id) => (
            
//             <div className="row form-row" key={id} id={'education' + id} style={{ background: '#F1F1F1', marginBottom:'4px'}}>
//                 <div className="col-3 col-md-3 col-lg-3">
//                 <div style={{ padding: '10px 0px 2px '}}>
//                     <h5>{el.degree}</h5>
//                     {/* <input type="text" className="form-control" name='degree' value={el.degree} /> */}
//                 </div>
//                 </div>
//                 <div className="col-4 col-md-4 col-lg-4">
//                 <div style={{ padding: '10px 0px 2px'}}>
//                     <h5>{el.college_institute}</h5>
//                     {/* <input type="text" className="form-control" name='college_institute' value={el.college_institute} /> */}
//                 </div>
//                 </div>
//                 <div className="col-3 col-md-3 col-lg-4">
//                 <div style={{ padding: '10px 0px 2px'}}>
//                     <h5>{el.college_institute}</h5>
//                     {/* <input type="text" className="form-control" name='year_of_completion' value={el.year_of_completion} /> */}
//                 </div>
//             </div>

//         {parseInt(id) !== -1 ?
//           <div className="col-2 col-md-2 col-lg-1">
//             <div className="delete-icon" style={{ padding: '10px 0'}}>
//               <a href="#0" className="btn btn-danger trash" style={{ width: '30px', height: '30px', fontSize:'16px' }} onClick={() => this.handleDelete(id)}>
//                 <i className="far fa-trash-alt"></i></a>
//             </div>
//           </div> : ''
//         }
//       </div>
//     ))
//   }

//   handleChange = (e, i) => {
//     const { name, value } = e.target;
//     let users = [...this.state.users];
//     users[i][name] = value;
//     this.setState({ users }, () => this.props.onChange(this.state.users)); // Notify parent about the change
//   };

    handleChange = (e, i) => {
        const { name, value } = e.target;
        const { onChange, educationData } = this.props;
        const updatedData = educationData.map((item, index) =>
        index === i ? { ...item, [name]: value } : item
        );
        onChange(updatedData);
    };
    createUI(){
        const { educationData } = this.props;
        return educationData.map((el, i) => (

        <div className="row form-row" key={i} id={'education' + i}>
                <div className="col-12 col-md-6 col-lg-3">
                <input type="hidden" className="form-control" name='id' value={el.id} onChange={(e) => this.handleChange(e, i)}/>
                    
                    <div className="form-group">
                        {/* <label>Degree</label> */}
                        <input type="text" className="form-control" placeholder='Degree' name='degree' value={el.degree} onChange={(e) => this.handleChange(e, i)} />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="form-group">
                        {/* <label>College/Institute</label> */}
                        <input type="text" className="form-control" placeholder='College/Institute' name='college_institute' value={el.college_institute} onChange={(e) => this.handleChange(e, i)} />
                    </div> 
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="form-group">
                        {/* <label>Year of Completion</label> */}
                        <input type="text" className="form-control" placeholder='Year of Completion' name='year_of_completion' value={el.year_of_completion} onChange={(e) => this.handleChange(e, i)} />
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
          <h4 className="card-title">Education</h4>
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

export default Education;
