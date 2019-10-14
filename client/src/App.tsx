
//<Route path="/manage" component={Manage} />
import * as React from 'react';

import 'antd/dist/antd.css';
import "./../src/App.css"
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Counter from './Counter';



import {
Change_passwd
} from "./router/Change_passwd"

import {
    exot
} from './router/exot'

import {
    Help
} from './router/Help'

import {
    Login
} from './router/Login'

import {
    Logout
} from './router/Logout'

import {
    Manage
} from './router/Manage'

import {
    Message
} from './router/Message'

import {
    Registered
} from './router/Registered'

import {
    Survey_preview
} from './router/survey/Survey_preview'

import {
    Survey_create
} from './router/survey/Survey_create'

import {
    Survey_update
} from './router/survey/Survey_update'
import {
    Survey_record
}
from "./router/survey/Survey_record"
import {Survey_analysis }
from "./router/survey/survey_analysis"

import {
    Test
} from './router/Test'

import {
    User_info
} from './router/User_info'

import {
    Vip
} from './router/Vip'

import {
    Vote_create
} from './router/vote/Vote_create'
import {
    Vote_update
}
from "./router/vote/Vote_update"
import {
    Vote_record
}
from "./router/vote/Vote_record"
import {
    Record_success
} from "./router/vote/record_success"
import {
    Record_fail
} from "./router/vote/record_fail"
import {
Vote_analysis
} from "./router/vote/Vote_analysis"
const Home = () => {
    return (<div>
        <h1>   大同投票,你身边最好用的投票软件,没有之一</h1>
        <ul>

            <li>
                <a href="/.tsx" >.tsx</a>
            </li>

            <li>
                <a href="/create" >Create</a>
            </li>

            <li>
                <a href="/exot" >exot</a>
            </li>

            <li>
                <a href="/help" >Help</a>
            </li>

            <li>
                <a href="/login" >Login</a>
            </li>

            <li>
                <a href="/logout" >Logout</a>
            </li>

            <li>
                <a href="/manage" >Manage</a>
            </li>

            <li>
                <a href="/message" >Message</a>
            </li>

            <li>
                <a href="/registered" >Registered</a>
            </li>

            <li>
                <a href="/survey" >Survey</a>
            </li>

            <li>
                <a href="/survey/create" >Survey_create</a>
            </li>

            <li>
                <a href="/survey/update" >Survey_update</a>
            </li>

            <li>
                <a href="/test" >Test</a>
            </li>

            <li>
                <a href="/user/info" >User_info</a>
            </li>

            <li>
                <a href="/vip" >Vip</a>
            </li>

            <li>
                <a href="/vote/create" >Vote_create</a>
            </li>

        </ul>
    </div>)
}


const App = () => {
    //update/id
    return (

        <Router>

            <Route exact={true} path="/" component={Home} />




            <Route path="/exot" component={
                exot
            } />

            <Route path="/help" component={
                Help
            } />
             <Route path="/change_passwd" component={
                Change_passwd
            } />

            <Route path="/login" component={
                Login
            } />

            <Route path="/logout" component={
                Logout
            } />

            <Route path="/manage" component={
                Manage
            } />

            <Route path="/message" component={
                Message
            } />

            <Route path="/registered" component={
                Registered
            } />
            <Route path="/survey/preview/:id" component={
               Survey_preview 
            }/>


            <Route path="/survey/create" component={
                Survey_create
            } />

            <Route path="/survey/update/:id" component={
                Survey_update
            } />
             <Route path="/survey/record/:id" component={
                Survey_record
            } />
             <Route path="/survey/analysis/:id" component={
                Survey_analysis
            } />
            

            <Route path="/test" component={
                Test
            } />

            <Route path="/user/info" component={
                User_info
            } />

            <Route path="/vip" component={
                Vip
            } />

<Route path="/vote/create" component={
                Vote_create
            } />
            <Route path="/vote/update/:id" component={
                Vote_update
            } />
             <Route path="/vote/record/:id" component={
                Vote_record
            } />
            <Route path="/vote/success/:id" component={
                Record_success
            } />
            <Route path="/vote/analysis/:id" component={
            Vote_analysis
            } />
            <Route path="/vote/fail" component={
                Record_fail
            } />

            <Route path="/counter" component={Counter} />
        </Router>
    )
}
export default App