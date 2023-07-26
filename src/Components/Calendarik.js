import React from "react";
import styled from 'styled-components';
import AddInterview from "./AddInterview";
import Week from "./Week";
import Hours from "./Hours";
import Delete from "./Delete";
import { useState, useEffect } from "react"; 

const Calendar = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  @media (max-width: 750px){
  height: 100vh}
`

const Wrapper = styled.section`
  max-width: 750px;
  padding: 5vw;
  background:white;
  margin:0;
  padding:0;
  border: 2px solid #e6e6e6;
`;

const queryFromLocalStorage = JSON.parse(localStorage.getItem('query'));
 
function Calendarik({query, setQuery}) {
  let q = new Date();
  let qu = q.toISOString();
  const [queryV, setQueryV] = useState([qu]);
  const [week, setWeek] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const [queryDelete, setQueryDelete] = useState('');
  // const [query, setQuery] = useState(queryFromLocalStorage);
  //const [query, setQuery] = useState(queryFromLocalStorage);
  const [clicked, setClicked] = useState([false, '0btn']);

  // useEffect(() => { localStorage. setItem('query', JSON. stringify(query)); }, [query]);

  return (
    <Calendar>
      <Wrapper>
        <AddInterview query={query} onQuery={setQuery} queryV={queryV} onQueryV={setQueryV} onWeek={setWeek} onYear={setYear} onMonth={setMonth} />
        <Week queryV={queryV} year={year} month={month} week={week} onWeek={setWeek} onYear={setYear} onMonth={setMonth} />
        <Hours onClicked={setClicked} clicked={clicked}  query={query} onQueryDelete={setQueryDelete} week={week} />
        <Delete query={query} onQuery={setQuery} onClicked={setClicked} clicked={clicked} onQueryDelete={setQueryDelete} queryDelete={queryDelete} week={week} onQueryV={setQueryV} />
      </Wrapper>
    </Calendar>
  );
}

export default Calendarik;