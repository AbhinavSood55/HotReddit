const subListReducer = (state = [], action) => {
    switch(action.type){
        case 'UPDATELIST':
            // let sList = action.payload.slice(0)
            state = []
            // state.concat(sList)
            return state = action.payload.slice(0)
        default:
            return state
    }
};

export default subListReducer;