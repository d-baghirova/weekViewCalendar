import React from "react";
import styled from 'styled-components';
import AddInterview from "./AddInterview";
import Week from "./Week";
import Hours from "./Hours";
import Delete from "./Delete";
import { useState } from "react";

const Calendar = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  @media (max-width: 750px){
  height: 100vh;
}
`

const Wrapper = styled.section`
  max-width: 750px;
  padding: 5vw;
  background:white;
  margin:0;
  padding:0;
  border: 2px solid #e6e6e6;
  @media (max-width: 300px){
    width: 100vw;
  }
`;

function Calendarik({query, setQuery, myTimeZone}) {
  let q = new Date();
  let qu = q.toISOString();
  const [queryV, setQueryV] = useState([qu]);
  const [week, setWeek] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');



  const [queryDelete, setQueryDelete] = useState('');
  // const [query, setQuery] = useState([]);
  const [clicked, setClicked] = useState([false, '0btn']);

  const sumDateWithMilliseconds = (date, milliseconds) => {
    let newDate = new Date(date.getTime() + milliseconds);
    return newDate;
  }

  return (
    <Calendar>
      <Wrapper>
        <AddInterview query={query} onQuery={setQuery} queryV={queryV} onQueryV={setQueryV} onWeek={setWeek} onYear={setYear} onMonth={setMonth} />
      <Week queryV={queryV} year={year} month={month} week={week} onWeek={setWeek} onYear={setYear} onMonth={setMonth} myTimeZone={myTimeZone} sumDateWithMilliseconds={sumDateWithMilliseconds} />
        <Hours onClicked={setClicked} clicked={clicked}  query={query} onQueryDelete={setQueryDelete} week={week} myTimeZone={myTimeZone} />
        <Delete query={query} onQuery={setQuery} onClicked={setClicked} clicked={clicked} onQueryDelete={setQueryDelete} queryDelete={queryDelete} week={week} onQueryV={setQueryV} myTimeZone={myTimeZone} />
      </Wrapper>
    </Calendar>
  );
}

export default Calendarik;