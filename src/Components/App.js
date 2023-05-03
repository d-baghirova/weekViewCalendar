import React from "react";
import styled from 'styled-components';
import AddInterview from "./AddInterview";
import Week from "./Week";
import Hours from "./Hours";
import Delete from "./Delete";
import { useState } from "react";

const Wrapper = styled.section`
  padding: 1em;
  background:white;
  border: 2px solid lightgray;
  margin:0;
  padding:0;
`;

function App() {
  //const [queryDelete, setQueryDelete] = useState('');
  let q = new Date();
  let qu = q.toISOString();
  const [queryV, setQueryV] = useState([qu]);
  const [week, setWeek] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const [queryDelete, setQueryDelete] = useState('');
  const [query, setQuery] = useState([]);
  const [clicked, setClicked] = useState([false, '0btn']);
  
  //const [clicked, setClicked] = useState([false]);

  return (
  <Wrapper>
    <AddInterview query={query} onQuery={setQuery} queryV={queryV} onQueryV={setQueryV} onWeek={setWeek} onYear={setYear} onMonth={setMonth} />
    <Week queryV={queryV} year={year} month={month} week={week} onWeek={setWeek} onYear={setYear} onMonth={setMonth} />
    <Hours onClicked={setClicked} clicked={clicked}  query={query} queryDelete={queryDelete} onQueryDelete={setQueryDelete} week={week} />
    <Delete query={query} onQuery={setQuery} onClicked={setClicked} clicked={clicked} onQueryDelete={setQueryDelete} queryDelete={queryDelete} week={week} onQueryV={setQueryV} />
    
  </Wrapper>
  );
}

export default App;
