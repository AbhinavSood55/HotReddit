export const update = (formData) => {
    return{
        type: 'UPDATE',
        payload: formData
    };
};

export const updateSubList = (subData) => {
    return{
        type: 'UPDATELIST',
        payload: subData
    };
};