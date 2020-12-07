import React from "react";
import { 
        BrowserRouter as Router, 
        Route, 
        Switch,
    } from 'react-router-dom';
import Home from './home';
import RedditList from './reddit-list';
import css from '../css/app.css';


const App = () => {  
    
    return (
        //Creating router
        <Router>    
            <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/redditlist' component={RedditList}/>
            </Switch>
        </Router>
    );
}

export default App;