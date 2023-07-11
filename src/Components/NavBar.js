import {Route, Routes, Link} from 'react-router-dom';
import Home from './Home';
import Calendarik from './Calendarik';
import Meetings from './Meetings';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import addNotification from 'react-push-notification';
import logo from '../../public/logo192.png'

const queryFromLocalStorage = JSON.parse(localStorage.getItem('query'));

function NavBar() {
    const [query, setQuery] = useState(queryFromLocalStorage);

    const clickToNotify = () => {
        addNotification({
            title: 'meeting will be soon',
            message: 'meeing with Diana',
            duration: 5000,
            icon: logo,
            native: true,
            onClick: () => window.location('https://www.youtube.com/watch?v=1Hh4tjnoqDM&ab_channel=CodeWithYd')
        })
    }

    useEffect(() => {
        localStorage.setItem("query", JSON.stringify(query));
      }, [query]);
      

    return(
        <div>
            <button>Notify me</button>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/calendar'>Calendar</Link>
                <Link to='/meetings'>Meetings</Link> 
            </nav>
            <Routes>
                <Route exact path='/' element={<Home />}></Route>
                <Route exact path='/calendar' element={<Calendarik query={query} setQuery={setQuery} />}></Route>
                <Route exact path='/meetings' element={<Meetings query={query} />}></Route> 
            </Routes>
        </div>
    )
}

export default NavBar;