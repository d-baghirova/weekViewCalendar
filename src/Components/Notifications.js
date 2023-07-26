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

    const work = () => {
        Notification.requestPermission().then(perm => {
            new Notification('Thank you',
            {body: "for using our notifications"}
            )
        })
    }

    const notifyMe = () => {
        new Notification('Meeting will be soon',
            {body: "Meeting will be in an hour check your schedule and get ready"}
            )
    }

    const subtractHours = (date, hours) => {
      date.setHours(date.getHours() - hours);
    
      return date;
    }

    const checkSchedule = (queryFromLocalStorage) => {

        if (queryFromLocalStorage != null){
            queryFromLocalStorage.forEach(q => {
                let d = new Date(q.slice(0,23));
                let nd = subtractHours(d, 1);
                let now = new Date();
                let ms = Math.abs(nd.getTime() - now.getTime()) ;
                setTimeout(() => {console.log(`${d} and ${subtractHours(d, 1)}`)}, 3000);
                
            })
        }
    } 

    useEffect(() => {
        
        const queryFromLocalStorage = JSON.parse(localStorage.getItem('query'));
        // checkSchedule(queryFromLocalStorage);
        // setTimeout(() => {console.log(subtractHours(new Date(),1));})

        if (queryFromLocalStorage != null){
            queryFromLocalStorage.forEach(q => {
                setTimeout(() => {console.log(new Date(q.slice(0,23)).getHours())}, 3000)
            })
        }

    }, [query])

    return(
        <button onClick={work}>Notify me</button>
    )
}

export default Notifications;