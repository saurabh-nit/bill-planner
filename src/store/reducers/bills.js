import actionTypes from '../actionTypes';

const sampleData = [
  {
    "id":1,
    "description":"Dominoes",
    "category":"FoodNDining",
    "amount":"430",
    "date":"01-02-2020"
  },
  {
    "id":2,
    "description":"Car wash",
    "category":"Utility",
    "amount":"500",
    "date":"01-06-2020"
  },
  {
    "id":3,
    "description":"Amazon",
    "category":"Shopping",
    "amount":"2030",
    "date":"01-07-2020"
  },
  {
    "id":4,
    "description":"House rent",
    "category":"Food & Dining",
    "amount":"35900",
    "date":"01-03-2020"
  },
  {
    "id":5,
    "description":"Tuition",
    "category":"Education",
    "amount":"2200",
    "date":"01-12-2020"
  },
  {
    "id":6,
    "description":"Laundry",
    "category":"Personal Care",
    "amount":"320",
    "date":"01-14-2020"
  },
  {
    "id":7,
    "description":"Vacation",
    "category":"Travel",
    "amount":"3430",
    "date":"01-18-2020"
  },
  {
    "id":8,
    "description":"Credit Card Bill",
    "category":"Finance",
    "amount":"35900",
    "date":"01-03-2020"
  },
];

export default (state = {}, action) => {
  if (action.type === actionTypes.SET_ALL_BILLS) {
    return Object.assign({}, state, {
          billList: action.response,
          billLoading: false
        });
  } else if (action.type === actionTypes.GET_ALL_BILLS) {
    return Object.assign({}, state,
        { billLoading: false,
          billList: sampleData
        });
  } else if(action.type === actionTypes.RESET_ALL_FILTER) {
      return Object.assign({}, state, {
        billList: sampleData,
        billLoading: false
      });
  } else if(action.type === actionTypes.GET_DROP_DOWN_DATA) {
    return Object.assign({}, state, {
      getDropdownData: sampleData.map(el => {
        return {name: el.category, value: el.category}}),
      billLoading: false
    });
  }else {
    return state;
  }
};
