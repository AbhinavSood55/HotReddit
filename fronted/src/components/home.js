import React, { useState } from "react";
import {
    FormControl, 
    InputLabel, 
    Input, 
    FormHelperText,
    Button,
    CircularProgress,
    Fade,
    Box,
} from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { update, updateSubList } from "../actions"

const Home = () => {

    const defsearchInp = useSelector(state => state.formData.searchInput)
    const subList = useSelector(state => state.subList)
    const dispatch = useDispatch();

    const history = useHistory()
    const[ showLoader, setShowLoader ] = useState(false)
    const[ bStatus, setBStatus ] = useState(false)
    const[ searchSub, setSearchSub ] = useState(defsearchInp)

    const updateSubs = (data, subList) => {
        debugger
        dispatch(updateSubList(data))
    }
    

    const getList = () => {
        
        setShowLoader(prevShowLoader => !prevShowLoader)
        setBStatus(prevBStatus => !prevBStatus)
            
        if(searchSub){
            fetch('/reddit-api/',{
                method: 'POST',
                body: JSON.stringify({
                    subred: searchSub,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(
                    response => {
                        if (response.status === 200)
                        {
                            response.json().then(data=> {
                                updateSubs(data)
                            })
                            .then( () => {
                            setShowLoader(prevShowLoader => !prevShowLoader)
                            setBStatus(prevBStatus => !prevBStatus)
                            history.push({
                                pathname:"/redditlist",
                            })
                            });
                        }
                        else
                        {
                            setShowLoader(prevShowLoader => !prevShowLoader)
                            setBStatus(prevBStatus => !prevBStatus)
                            return alert(response.statusText);
                        }
                    }
                );
            // .then(data => {
            //     updateSubs(data)
            // })
            // .then( () => {
            // setShowLoader(prevShowLoader => !prevShowLoader)
            // setBStatus(prevBStatus => !prevBStatus)
            // history.push({
            //     pathname:"/redditlist",
            // })
            // });
        } else {
            alert('Pass a Subredit to view the list')
            setShowLoader(prevShowLoader => !prevShowLoader)
            setBStatus(prevBStatus => !prevBStatus)
        }
    }

    return(
        <Box 
            display="flex"
            justifyContent="center"
            m={2}
            p={2}  
            >
            <Box 
                display="flex"
                flexDirection="column"
                alignItems="center"
                m={2}
                p={2}>
                <FormControl>
                    <InputLabel htmlFor="my-input">SubReddit</InputLabel>
                    <Input 
                        id="my-input" 
                        aria-describedby="my-helper-text" 
                        value={searchSub}
                        // onChange={(e) => {setSearchSub(e.target.value)}} />
                        onChange={(e) => {
                            dispatch(update({searchInput:e.target.value}))
                            setSearchSub(e.target.value)
                            }} />
                    <FormHelperText id="my-helper-text">Type the SubReddit list you would like to get</FormHelperText>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={getList}
                        disabled={bStatus}
                    >
                            Get List
                    </Button>
                </FormControl>
                <Box m={8} p={8}>
                    <Fade in={showLoader}>
                        <CircularProgress size="5rem"/>
                    </Fade>
                </Box>
            </Box>
        </Box>
    );

}

export default Home;