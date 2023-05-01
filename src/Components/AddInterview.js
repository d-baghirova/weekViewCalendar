import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
    margin-right: 30px;
    border: none;
    padding: 0;
    background: none;
`;

const Plus = styled(Button)`
  font-size: 2rem;
  color: red;
  text-decoration: none;
  &:hover,
  &:focus {
    color: palevioletred;
  }
  &:active {
    color: coral;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
`

const H1 = styled.h1`
  margin-left: 30px;
`
//2020-12-18 10:10:08

export default function AddInterview({query, onQuery, onWeek, onYear, onMonth}) {

  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');

  useEffect(() => {
    if (typeof query[0] === 'string'){
    currently()}
  },[query])

  const handlePlus = () => {
    let datee = prompt("YYYY-MM-DD HH:mm:ss");
    let format = datee.slice(0,10) + 'T22:' + datee.slice(11,16)+'.'+datee.slice(17)+'0Z';
    onQuery([format]);
  }

  const handleToday = () => {
    //let datee = prompt("YYYY-MM-DD HH:mm:ss");
    let q = new Date();
    let qu = q.toISOString();
    onQuery([qu]);
  }

  const currently = () => {
    if (query[0]!==undefined && query[0]!==null && query[0]!==false){
    let chosenDay = query[query.length-1];
    //console.log(getWeekFromDate(`2020-12-18T22:10:10.080Z`));
    if (chosenDay)
    console.log(chosenDay);
    let result = getWeekFromDate(chosenDay);
    let weekDays = result.map(r => r);
    onYear(chosenDay.slice(0,4));
    onMonth(chosenDay.slice(5,7));
    onWeek(weekDays);
  }
  }

  const getMonday = (d) => {
    d = new Date(d);
    let day = d.getDay(),
       diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
    let result = new Date(d.setDate(diff))
    return result.toISOString();
}

const  getWeek = (mon) => {
    let arr = [];
    arr.push(mon)
    for (let i=0; i<=5; i++){
        arr.push(getNextDate(arr[i]).toISOString())
    }
    return arr;
}

const getNextDate = (str) => {
    const today = Date.parse(str);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
}

const getWeekFromDate = (d) => {
    let mon = getMonday(d);
    let arr = getWeek(mon);
    return arr;
}

  return (
    <Heading>
      <H1>Interviews Calendar</H1>
      <Plus onClick={handlePlus}>+</Plus>
      <button id='today' onClick={handleToday}>Today</button>
    </Heading>
  );
}