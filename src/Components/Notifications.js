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



function Notifications({notificationType, setNotificationType}) {

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