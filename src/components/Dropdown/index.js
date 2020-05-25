import React, { Component } from "react";
import Transition from '../Transition'
import caretDownIcon from '../../assets/icons/icon-caret-down.svg'
import './style.scss';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListVisible: false
    };
    this.toggleList = this.toggleList.bind(this);
  }

  toggleList () {
    this.setState({isListVisible: !this.state.isListVisible})
  }

  getLabel() {
    const {defaultLabel, value, listData} = this.props;
    const labelList = listData.filter(item => item.value === value.value);
    if (labelList.length) {
      return labelList[0].name;
    }
    return defaultLabel;
  }

  render() {
    const {listData, onSelect, keyName, value} = this.props;
    const {isListVisible} = this.state;
    return (
      <div className="dropdown-wrapper">
        <div className="selected-box" onClick={this.toggleList}>
          {this.getLabel()}
          <div className={`icon-dropdown ${isListVisible ? 'open' : ''}`}>
            <img src={caretDownIcon} alt="Caret Down"/>
          </div>
        </div>
        <Transition visible={isListVisible}>
          <div className="list-items">
            {listData.map((el, index) => {
              return (
                <div
                  className={`item ${el.value === value.value ? 'selected' : ''}`}
                  key={el.value}
                  onClick={()=>{
                    onSelect(keyName, el);
                    this.toggleList()
                  }}
                >
                  {el.name}
                </div>)
            })}
          </div>
        </Transition>
      </div>
    );
  }
}

export default Dropdown;
