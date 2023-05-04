import React, {useState} from "react";
import styled from 'styled-components';

const Wrapped = styled.div`
  background-color: #f6f6f6;
  border: 2px solid #e6e6e6;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto;
`

const Item = styled.div`
  background-color: #f6f6f6;
  border: 1px solid transparent;
  padding: 20px;
  font-size: 20px;
  text-align: center;
`

const ItemToday = styled.div`
  background-color: red;
  color: white;
  border: 1px solid transparent;
  border-radius:100%;
  width: 30px;
  height: 30px;
  margin: 20px 0 0 20px ;
  font-size: 20px;
  text-align: center;
`

const Month = styled.div`
  display: flex;
  margin-left:13%;
  width: 87%;
  justify-content: space-between;
`

const Btn = styled.button`
    margin-right: 30px;
    border: none;
    padding: 0;
    background: none;
`;

const P = styled.p`
  font-size: 1.5rem;
`

const Arrow = styled(Btn)`
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

function Week({query, year, month, week, onWeek, onYear, onMonth}) {

  const chosenWeek = ['','M', 'T', 'W', 'T', 'F', 'S', 'S', ''];
  const todayDate = new Date();
  const tdate = week.find(d => d.slice(0,10) === todayDate.toISOString().slice(0,10));
  let ind;
  if (tdate){
    ind = week.indexOf(tdate);
  }
  if (week){
    week.forEach(d => {
      chosenWeek.push(d.slice(8,10));
    });
  }

  const getNextDate = (str, i) => {
    const today = Date.parse(str);
    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + i);
    return tomorrow;
}

  const getSequentWeek = (w, i) => {
    let nw = w.map(d => getNextDate(d, i).toISOString())
    return nw
  }

  const handleNext = () => {
    onWeek(getSequentWeek(week, 7));
    let sw = getNextDate(week[6], 1);
    let next = sw.toISOString();
    onYear(next.slice(0,4));
    onMonth(next.slice(5,7));
  }

  const handleBack = () => {
    onWeek(getSequentWeek(week, -7));
    let sw = getNextDate(week[0], -1);
    let previous = sw.toISOString();
    onYear(previous.slice(0,4));
    onMonth(previous.slice(5,7));
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const monthNums = ['01', '02', '03', '04', '05', '06','07', '08', '09', '10', '11', '12']

  const toName = (m) => {
    let ind = monthNums.indexOf(m);
    return monthNames[ind];
  }
  
  return (
    <Wrapped>
      <Grid>
        {chosenWeek.map((day, i) => i===ind+8 ? <ItemToday key={i}>{day}</ItemToday> : <Item key={i}>{day}</Item>)}
      </Grid>
      <Month>
        <Arrow onClick={handleBack} id="back">{'<'}</Arrow>
        <P>{year ? `${year} ${toName(month)}` : '2023'} </P>
        <Arrow onClick={handleNext} id="next">{'>'}</Arrow>
      </Month>
    </Wrapped>
  );
}

export default Week;
