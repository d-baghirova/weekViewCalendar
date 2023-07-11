import Calendarik from "./Calendarik";
import Home from "./Home";
import NavBar from "./NavBar";
import styled from 'styled-components';
import { useState } from "react";

const Body = styled.div`
  text-align: center;
  @media (max-width: 750px){
  height: 100vh}
`

function App() {
  
  return (
    <Body>
      <NavBar />
    </Body>
  );
}

export default App;