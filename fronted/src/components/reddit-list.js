import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, 
        CardContent, 
        List, 
        Typography, 
        makeStyles, 
        Box,
        CardHeader,
        CardMedia, 
    } from '@material-ui/core';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { blueGrey } from "@material-ui/core/colors";
import { useSelector } from 'react-redux'
import styled from 'styled-components';

const useStyles = makeStyles({
    root: {
      maxWidth: 700,
      backgroundColor: blueGrey,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const RedditList = (props) => {
    
    const [listDisplay, setListDisplay] = useState(true)
    const [subDetail, setSubDetail] = useState({})
    const handleDispChange = (details) => {
        setListDisplay(prevListDisp => !prevListDisp)
        
        if(details){
            const detailData = JSON.parse(details)
            setSubDetail(prevSubDetail => JSON.parse(details))
        } else {
            setSubDetail(prevSubDetail => [])
        }
    }
    const subList = useSelector(state => state.subList)
    const content = subList.map((item) => {
        Object.assign(item, {setListDisplay: handleDispChange});
        return <ContentComponent item={item} />;
    }
    )


    if (subList) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                m={2}
                p={2}
                style={{
                    overflowX: "hidden",
                    overflowY: "auto",
                    position: "relative",
                    width: "70%",
                    height: "100%",
                }}
                >
                <List className= {'listView-' + (listDisplay ? 'right': 'left')} width="90%">
                    {content}
                </List>
                <DetailSlide 
                    style={{
                        width: "100%",
                    }}
                    className = {'detailView-' + (listDisplay ? 'right': 'left')}
                    >
                    <SubDetail 
                        setListDisplay={handleDispChange} 
                        setSubDetail={setSubDetail}
                        subDetail={subDetail}/>
                </DetailSlide>
            </Box>
        );
    } else {
        return (
            <Card>
                <Typography variant="h1">No Subreddit Ordered!!!!</Typography>
            </Card>);
    }
}


const ContentComponent = (props) => {
    let item = props.item;
    const classes = useStyles();
    const history = useHistory();

    return(
        <div> 
            <Card
                className={classes.root} 
                variant='outlined'>
                <CardContent 
                    style={{
                        backgroundColor: "darkgrey",
                        }} 
                    id={item.id}>
                    <Button 
                        value={JSON.stringify(item)}
                        id={item.id}
                        key={item.id} 
                        onClick={
                            (e)=>{
                                console.log(e.target.id)
                                props.item.setListDisplay(e.target.getAttribute("value"))
                        }
            }>
                
                    <div
                        id={item.id}
                        value={JSON.stringify(item)}
                        >
                        {item.title}</div>
                    <ArrowForwardIosRoundedIcon
                        id={item.id}
                        />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

const Button = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-justify: center;
    border: none;
    text-decoration: none;
    padding: 10px;
    width: 100%;
    margin: none;
    background-color: #444453;
    cursor: pointer;
    height: 100%;
    color: #b2fdfd;
    border-radius: 3px;
    font-size: large;
    outline:none;
    &:hover {
        box-shadow: 0 10px 10px rgba(17, 16, 62, 0.15);
        background-color: #5f5f6d;
    }
    &:active {
        background: rgb(104, 173, 226);
        color: white;
        border: none;
        border-width: 0px;
    }
`
const DetailSlide = styled.div`
    display: block;
`

const SubDetail = (props) => {
    
    const classes = useStyles();

    return(
        <>
            <ArrowBackRoundedIcon
                    style={{
                        height: "4rem",
                        width: "4rem",
                        backgroundColor: "cyan",
                        borderRadius: "3px",
                    }}
                    onClick={
                        ()=>{
                            props.setListDisplay()
                    }}/>
            <Card
                className={classes.root}
                variant="outlined" raised="true">
                <CardHeader
                    title={props.subDetail.title}> 
                </CardHeader>
                <CardContent 
                    style={{
                        overflowX: "scroll",
                    }}
                >
                    <Typography>
                        <p>
                        {props.subDetail.selftext}</p>
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default RedditList;