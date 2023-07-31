import {Route, Routes, Link} from 'react-router-dom';
import Home from './Home';
import Calendarik from './Calendarik';
import Meetings from './Meetings';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import logo from './images/logo512.png';

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }



function Notifications({query}) {

    const options = [

        { label: '1 week before event', value: `${7*24*60}` },
        { label: '2 days before event', value: `${2*24*60}` },
        { label: '1 day before event', value: `${24*60}` },
        { label: '3 hours before event', value: `${3*60}` },
        { label: '2 hours before event', value: `${2*60}` },
        { label: '1 hour before event', value: `${60}` },
        { label: '45 minutes before event', value: `${45}` },
        { label: '30 minutes before event', value: `${30}` },
        { label: '15 minutes before event', value: `${15}` },
        { label: '10 minutes before event', value: `${10}` },
        { label: '5 minutes before event', value: `${5}` }

    ];
     
    const [notificationType, setNotificationType] = useState(60);
     
    const handleChange = (event) => {
     
        setNotificationType(event.target.value);
     
    };

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
           <button onClick={work}>Notify me</button>
           <select value={notificationType} onChange={handleChange}>

         {options.map((option, i) => (

           <option key={i} value={option.value}>{option.label}</option>

         ))}

       </select>

     <p>We eat {notificationType}!</p>
        </div>
    );
}

export default Notifications;