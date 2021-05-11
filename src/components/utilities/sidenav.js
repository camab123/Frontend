import React, { useReducer } from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import './side_nav_style.css';
import { useApi } from '../utilities/useApi';
import { getApi } from './useApi';
import { logout } from '../../reducers/auth';
import {
    useQuery,
  } from 'react-query'
import { useDispatch } from "react-redux";

function Sidebar ({avatar, username}) {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }

return (
    <>
        <Nav className="col-md-12 d-none d-md-block sidebar">
            <div className="sidebar-sticky"></div>
        {/*Avatar and Username*/}
            <img src={avatar} alt='side_avatar' className="side-nav-avatar"/>
        <div className="side-nav-username">
            {username}
        </div>
        <div className="side-nav-category">
            Trade
            <hr className='style1'/>
        </div>
        <Nav.Item>
            <Nav.Link href="/home">
                <div className="side-nav-text">
                Portfolio
                </div>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link href="/home">
                <div className="side-nav-text">
                Tracker
                </div>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link href="/home">
                <div className="side-nav-text">
                Performance
                </div>
            </Nav.Link>
        </Nav.Item>

        <br/>

        <div className="side-nav-category">
            Social
            <hr className='style1'/>
        </div>
        <Nav.Item>
            <Nav.Link href="/home">
                <div className="side-nav-text">
                Feed
                </div>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link href="/home">
                <div className="side-nav-text">
                Trending
                </div>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
        </Nav.Item>



        <br/>

        <div className="side-nav-category">
            Account
            <hr className='style1'/>
        </div>
        <Nav.Item>
            <Nav.Link href={"/" + username}>
                <div className="side-nav-text">
                My Profile
                </div>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link href="/home">
                <div className="side-nav-text">
                Settings
                </div>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link>
                <div className="side-nav-text" onClick={handleLogout}>
                        Logout
                </div>
            </Nav.Link>
        </Nav.Item>

        </Nav>
        
    </>
    );
};

function Display_Sidebar ({username}){
    const query = useQuery(`get-get_user`, getApi('/user/current'))
    const {isLoading, isError} = query;
    if(isError){
        return <p>ERROR</p>;
    }
    else if(isLoading){
        return <p>Loading...</p>;
    }
    else{
        /* we can only access the data once its loaded and there's no error.
        It's structured data: {data}, this is not a mistake
        */
        const {data: { data }} = query
        
        console.log(data)

        return (
            <div>
                {
                    data.map(e =>(
                        <Sidebar
                            avatar = {e.avatar}
                            username = {e.username}
                        />
                    )
                    )
                }
                </div>
        )
                    
                    
        
}
}

  export default Display_Sidebar