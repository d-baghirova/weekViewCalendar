import {Route, Routes, Link, useLocation} from 'react-router-dom';
import Home from './Home';
import Calendarik from './Calendarik';
import Meetings from './Meetings';
import { useEffect, useState } from 'react';
import Notifications from './Notifications';
import './NavBar.css';

function NavBar({query, setQuery, notificationType, setNotificationType }) {

    const notifyMe = (description) => {
        const notification = new Notification(description,
            {body: `${description} will be in an hour check your schedule and get ready`}
        );

        notification.close();
    }

    const subtractHours = (date, hours) => {
      date.setHours(date.getHours() - (hours));
    
      return date;
    }

    function subMins(d, mins) {
        const absolute = Math.abs(mins);
        let date = new Date(d - absolute * 60000);
        
        return date;
    } 
      
    // const sumDateWithMilliseconds = (date, milliseconds) => {
    //     let newDate = new Date(date.getTime() + milliseconds);
    //     return newDate;
    //   }

    const getDif = (date) => {
        const now = new Date();
        return now-date;
    }

    const myTimeZone = (d) => {
        return Math.round(d.getTimezoneOffset() * 60000);
    }

    const getTimer = (d, m) => {
        const tz = myTimeZone(d);
        const dd = new Date(d.getTime() + tz);
        const whenToNotify = subMins(dd, m);
        return (-1)*getDif(whenToNotify);
    }

    const checkSchedule = (queryFromLocalStorage, m) => {
        if (queryFromLocalStorage != null){
            queryFromLocalStorage.forEach(q => {
                const d = new Date(q.slice(0,24));
                console.log(getTimer(d, m));

                if (getTimer(d, m) > 0){
                    const timer = setTimeout(() => {
                        notifyMe(q.slice(24));
                    }, getTimer(d, m));
                    return () => clearTimeout(timer);
                }

            })
        }
    } 


    useEffect(() => {
        
        let queryFromLocalStorage = JSON.parse(localStorage.getItem('query'));

        checkSchedule(queryFromLocalStorage, notificationType);

    }, [query, notificationType]);

    console.log(useLocation().pathname);


    return(
        <div className='NavBar'>
            <nav> 
                <Link id="left"  className={useLocation().pathname == '/' ? 'here' : 'not'}              to='/'>Home</Link>
                <Link            className={useLocation().pathname == '/calendar' ? 'here' : 'not'}      to='/calendar'>Calendar</Link>
                <Link            className={useLocation().pathname == '/meetings' ? 'here' : 'not'}      to='/meetings'>Events</Link>
                <Link id="right" className={useLocation().pathname == '/notifications' ? 'here' : 'not'} to='/notifications'>Reminder</Link>
            </nav>
            <Routes>
                <Route exact path='/' element={<Home />}></Route>
                <Route exact path='/calendar' element={<Calendarik myTimeZone={myTimeZone} query={query} setQuery={setQuery} />}></Route>
                <Route exact path='/meetings' element={<Meetings query={query} />}></Route> 
                <Route exact path='/notifications' element={<Notifications notificationType={notificationType} setNotificationType={setNotificationType} query={query} />}></Route> 
            </Routes>
        </div>
    ) 
}

export default NavBar;