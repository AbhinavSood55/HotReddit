const formDataReducer = (state = {searchInput: ''}, action) => {
    switch(action.type){
        case 'UPDATE':
            let fDataState = {searchInput: ''}
            fDataState.searchInput = action.payload.searchInput
            return state = fDataState
        default:
            return state
            
    }
}

export default formDataReducer