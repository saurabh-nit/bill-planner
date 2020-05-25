import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OverlayPopup from '../../components/OverlayPopup';
import Dropdown from '../../components/Dropdown'
import * as actions from '../../store/actions';
import './style.scss';
import { Chart } from "react-google-charts";

const CalendarChart = ({dataForIt}) => {
    return (<Chart
        // width={1000}
        // height={350}
        chartType="Calendar"
        loader={<div>Loading Chart</div>}
        data={dataForIt}
        options={{title: 'Bills for this month',}}
        rootProps={{ 'data-testid': '1' }}
    />)
};

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isEditPopupVisible: false,
        editData: {},
        addData: {},
        dropDown: {
            keyName: 'category',
            value: '',
            defaultLabel: 'Select Category'
        }
    };
  }

  componentDidMount() {
     this.props.actions.getAllBills();
     this.props.actions.getDataForDropdown();
  }

  editThisBill = (event, bill = {}) => {
      event.persist();
      console.log('editThisBill:', bill);
      this.setState({isEditPopupVisible: true, editData: bill});
  };

  deleteThisBill = (bill) => {
      this.props.actions.setUpdatedBills([...this.props.billList].filter(el => el.id !== bill.id));
  };

  toggleOverlay = () => {
      this.setState({isEditPopupVisible: false});
  };

  handleInput = (event) => {
     event.persist();
     let currenData = this.state.editData;
     if(currenData.id) {
         currenData[event.target.name] = event.target.value;
         this.setState({editData: {...currenData}});
     } else {
         let currenAddData = this.state.addData;
         Object.assign(currenAddData, {[event.target.name]: event.target.value});
         this.setState({addData: currenAddData});
     }
  };

  cancelChange = () => {
      this.setState({isEditPopupVisible: false});
  };

  updateData = (event) => {
      event.persist();
      if(event.target.name === 'EDIT') {
          this.setState({isEditPopupVisible: false});
          let currenData = this.state.editData;
          let currentList = [...this.props.billList];
          currentList.forEach(bill => {
              if(bill.id ===  currenData.id) {
                  Object.assign(bill, {...currenData});
              }
          });
          this.props.actions.setUpdatedBills(currentList);
      } else {
          console.log('ADD_NEW', this.state.addData);
          let currenAddData = this.state.addData;
          currenAddData.id = this.props.billList.length+1;
          currenAddData.date = this.state.addData.date ? this.state.addData.date.split('-').reverse().join('-') : '';
          let currentList = [...this.props.billList];
          currentList.unshift(currenAddData);
          this.props.actions.setUpdatedBills(currentList);
          this.setState({isEditPopupVisible: false});
      }
  };

  filterData = (data) => {
      let currentList = [...this.props.billList];
      this.props.actions.setUpdatedBills([...currentList].filter(el => el.category === data.name));
  };

  resetFilter = () => {
      let {dropDown} = this.state;
      dropDown.value = '';
      dropDown.defaultLabel = 'Select Category';
      this.setState({dropDown});
      this.props.actions.resetFilters();
  };

  getChartData = () => {

      let data = [[{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }]];

      this.props.billList.forEach(el => {
          data.push([new Date(el.date), parseInt(el.amount, 10)]);
      });

      return data;
  };

  setThisMaxThreshold = (event) => {
      event.persist();
      console.log('setThisMaxThreshold', event.target.value);
      if(!event.target.value) {
          this.props.actions.resetFilters();
          return false;
      }
      setTimeout(()=>{
       let data = [...this.props.billList];
       data.sort(function (a, b) {
           if(parseInt(a.amount) > parseInt(b.amount)) return -1;
           if(parseInt(a.amount) < parseInt(b.amount)) return 1;
           return 0
       });
       console.log('SORTED:', data);

          let remaining = parseInt(event.target.value, 10);
          data.forEach(el => {
              console.log('[remaining]:', remaining);
              console.log('[el.amount]', el.amount);
              if(parseInt(el.amount, 10) <= remaining) {
                  el.isHighlighted = true;
                  remaining = remaining - parseInt(el.amount, 10)
              } else {
                  el.isHighlighted = false;
              }
          });
       console.log('HIGHLIGHTED:', data);
       this.props.actions.setUpdatedBills(data);
      }, 0)
  };

  render() {
    const currenData = this.state.editData;
    const currentList = [...this.props.billList];
    const dropdownData = this.props.getDropdownData || [];
    return (
      <div className="home">
          <div style={{textAlign: 'center', fontSize: '28px', fontWeight: 600}}>Bill Dashboard</div>
          <div style={{marginTop: '50px', marginBottom: '50px'}}>{currentList.length && (<CalendarChart dataForIt={this.getChartData()}/>)}</div>
          <div style={{display: "flex", flexWrap: 'wrap', justifyContent: "flex-start", marginBottom: '20px', marginTop: '20px'}}>
              {dropdownData.length && (<div>
                  <Dropdown
                      keyName={this.state.dropDown.keyName}
                      value={this.state.dropDown.value}
                      defaultLabel={this.state.dropDown.defaultLabel}
                      listData={dropdownData}
                      onSelect={(keyName, data) => {
                          let {dropDown} = this.state
                          dropDown.value = data
                          dropDown.defaultLabel = data.name
                          this.setState({dropDown});
                          this.filterData(data)
                      }}
                  />
              </div>)}
              {this.state.dropDown.value && (<div className="add-new">
                  <button style={{background: 'lightblue'}} onClick={this.resetFilter}>Reset Filter</button>
              </div>)}
              <div className="add-new">
                  <button onClick={(event) => this.editThisBill(event)}>Add new bill</button>
              </div>
              <div className="add-new">
                  <input type="number"
                         placeholder="Set max value"
                         onChange={(event) => this.setThisMaxThreshold(event)}/>
              </div>
          </div>
          <div className="edit-container">
              <OverlayPopup isOverlayOpen={this.state.isEditPopupVisible} closePopup={this.toggleOverlay}>
                  <div className="input-data">
                      Amount
                      <input type="text"
                             name="amount"
                             className="input-box"
                             value={currenData.amount}
                             onChange={this.handleInput}/><br/>
                       Category
                      <input type="text"
                             name="category"
                             className="input-box"
                             onChange={this.handleInput}
                             value={currenData.category}/><br/>
                       Description
                      <input type="text"
                             name="description"
                             className="input-box"
                             onChange={this.handleInput}
                             value={currenData.description}/><br/>
                      Date
                      <input type="date"
                             name="date"
                             className="input-box"
                             onChange={this.handleInput}
                             value={currenData.date ? currenData.date.split("-").reverse().join("-"): ""}/><br/>
                      <button className="action-btn" onClick={this.cancelChange}>Cancel</button>
                      {currenData.id && (<button name="EDIT" className="action-btn" onClick={this.updateData}>Update</button>)}
                      {!currenData.id && (<button name="ADD" className="action-btn" onClick={this.updateData}>Add</button>)}
                  </div>
              </OverlayPopup>
          </div>
          <div className="bill-container">
            {!this.props.billLoading &&(
                currentList.map((el, index) => {
                    return (
                        <div key={el.id+index+el.amount} className="bill-item" style={{
                            margin: '20px 0px',
                            padding: '10px',
                            fontSize: '14px',
                            background: `${el.isHighlighted ? '#abd673' : '#f5f5f5'}`,
                            borderRadius: '10px',
                            border: '1px solid lightgrey',
                            boxShadow: '0 0 16px -4px rgba(0, 0, 0, 0.12)'
                        }}>
                            <div>
                                <button
                                    style={{marginRight: '5px'}}
                                    onClick={(event) => this.editThisBill(event, el)}>
                                    Edit
                                </button>
                                <button onClick={() => this.deleteThisBill(el)}>Delete</button>
                                <div>Amount: <span>{el.amount}</span></div>
                                <div>Category: <span>{el.category}</span></div>
                                <div>Date: <span>{el.date}</span></div>
                                <div>Description: <span>{el.description}</span></div>
                                <div>Id: <span>{el.id}</span></div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => Object.assign({}, { ...state.bills }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Store);
