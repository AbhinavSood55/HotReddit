import subListReducer from './subList';
import formDataReducer from './formData';
import { combineReducers } from 'redux';


const allReducer = combineReducers({
    subList: subListReducer,
    formData: formDataReducer
});


export default allReducer;