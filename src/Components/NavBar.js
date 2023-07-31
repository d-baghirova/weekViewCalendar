import {Route, Routes, Link} from 'react-router-dom';
import Home from './Home';
import Calendarik from './Calendarik';
import Meetings from './Meetings';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Notifications from './Notifications';

const quer = JSON.parse(localStorage.getItem('query'));
const queryFromLocalStorage = (localStorage.getItem('query')) ? quer : [];

// const decode = (value) => {
//   return JSON.stringify(value)
// }

// const encode = (value) => {
//   return JSON.parse(value)
// }

// const useLocalStorage = (key, defaultState) => {
//     const [value, setValue] = useState(
//       encode(localStorage.getItem(key)||null) || defaultState
//     )
  
//     useEffect(() => {
//       localStorage.setItem(key, decode(value))
//     },  [value])
  
//     return [value, setValue]
//   }

function NavBar() {
    const [query, setQuery] = useState(queryFromLocalStorage);

    useEffect(() => { localStorage.setItem('query', JSON.stringify(query)); }, [query]);

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
                <Route exact path='/notifications' element={<Notifications query={query} />}></Route> 
            </Routes>
        </div>
    )
}

export default NavBar;