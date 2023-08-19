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

const n = JSON.parse(localStorage.getItem('notificationType'));
const nFromLocalStorage = (localStorage.getItem('notificationType')) != null ? n : 60;
 
function App() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(queryFromLocalStorage);
  const [notificationType, setNotificationType] = useState(nFromLocalStorage);

  useEffect(() => { 
    localStorage.setItem('query', JSON.stringify(query)); 
    localStorage.setItem('notificationType', JSON.stringify(notificationType));
  }, [query, notificationType]);

  const spinner = document.getElementById('spinner');

  if (spinner){
    setTimeout(() => {
      spinner.style.display="none";
      setLoading(false);
    }, 5000)
  }

  return (
    !loading && (<Body>
      <NavBar notificationType={notificationType} setNotificationType={setNotificationType} query={query} setQuery={setQuery} />
    </Body>)
  );
}

export default App;