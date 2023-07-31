import {Route, Routes, Link} from 'react-router-dom';
import Home from './Home';
import Calendarik from './Calendarik';
import Meetings from './Meetings';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Notifications from './Notifications';

// const quer = JSON.parse(localStorage.getItem('query'));
// const queryFromLocalStorage = (localStorage.getItem('query')) ? quer : [];


function NavBar({query, setQuery, notificationType, setNotificationType}) {
    // const [query, setQuery] = useState(queryFromLocalStorage);

    // useEffect(() => { localStorage.setItem('query', JSON.stringify(query)); }, [query]);

    // const [notificationType, setNotificationType] = useState(60);

    const work = () => {
        Notification.requestPermission().then(perm => {
            new Notification('Thank you',
            {body: "for using our notifications"}
            )
        })
    }

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
      

    const getDif = (date) => {
        const now = new Date();
        return now-date;
    }

    const getNum = (d, nt) => {
        if (nt.slice(1)==='hour' || nt.slice(1)==='hours'){
            return subtractHours(d, Number(nt.slice(0,1)));
        } else if (nt.slice(1)==='day' || nt.slice(1)==='days'){
            return subtractHours(d, Number(nt.slice(0,1)*24));
        } else if (nt === '1week'){
            return subtractHours(d, Number(nt.slice(0,1)*24*7));
        } 
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


    return(
        <div>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/calendar'>Calendar</Link>
                <Link to='/meetings'>Meetings</Link> 
                <Link to='/notifications'>Notifications</Link>
            </nav>
            <Routes>
                <Route exact path='/' element={<Home />}></Route>
                <Route exact path='/calendar' element={<Calendarik query={query} setQuery={setQuery} />}></Route>
                <Route exact path='/meetings' element={<Meetings query={query} />}></Route> 
                <Route exact path='/notifications' element={<Notifications notificationType={notificationType} setNotificationType={setNotificationType} query={query} />}></Route> 
            </Routes>
        </div>
    )
}

export default NavBar;