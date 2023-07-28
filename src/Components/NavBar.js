import {Route, Routes, Link} from 'react-router-dom';
import Home from './Home';
import Calendarik from './Calendarik';
import Meetings from './Meetings';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const quer = JSON.parse(localStorage.getItem('query'));
const queryFromLocalStorage = quer ? (localStorage.getItem('query')) : [];

function NavBar() {
    const [query, setQuery] = useState(queryFromLocalStorage);

    useEffect(() => { localStorage.setItem('query', JSON.stringify(query)); }, [query]);

    return(
        <div>
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