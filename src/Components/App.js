import Calendarik from "./Calendarik";
import Home from "./Home";
import NavBar from "./NavBar";
import styled from 'styled-components';
import { useState, useEffect } from "react";

const Body = styled.div`
  text-align: center;
  @media (max-width: 750px){
  height: 100vh}
`

const quer = JSON.parse(localStorage.getItem('query'));
const queryFromLocalStorage = (localStorage.getItem('query')) ? quer : [];

function App() {

  const [query, setQuery] = useState(queryFromLocalStorage);

  useEffect(() => { localStorage.setItem('query', JSON.stringify(query)); }, [query]);

  const [notificationType, setNotificationType] = useState(60);
  
  return (
    <Body>
      <NavBar notificationType={notificationType} setNotificationType={setNotificationType} query={query} setQuery={setQuery} />
    </Body>
  );
}

export default App;