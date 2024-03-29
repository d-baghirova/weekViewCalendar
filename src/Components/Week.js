import React, {useState} from "react";
import styled from 'styled-components';

const Wrapped = styled.div`
  background-color: #f6f6f6;
  border: 2px solid #e6e6e6;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto;
  width: 87%;
`

const Item = styled.div`
  background-color: #f6f6f6;
  border: 1px solid transparent;
  padding: 20px;
  font-size: 20px;
  text-align: center;
  @media (max-width: 750px) {
    padding: 10px;
  }
  @media (max-width: 300px) {
    font-size: 13px;
  }
`

const ItemToday = styled.div`
  background-color: red;
  color: white;
  border: 1px solid transparent;
  border-radius:100%;
  width: 30px;
  height: 30px;
  margin: 20px 0 0 10px ;
  font-size: 20px;
  text-align: center;
  @media (max-width: 750px){
    margin: 10px 0 0 5px ;
  }
  @media (max-width: 300px) {
    font-size: 13px;
    width: 20px;
    height: 20px;
  }
`

const Month = styled.div`
  display: flex;
  margin-left:13%;
  width: 87%;
  justify-content: space-evenly;
`

const Btn = styled.button`
    margin-right: 30px;
    border: none;
    padding: 0;
    background: none;
`;
 
const P = styled.p`
  font-size: 1.5rem;
  @media (max-width: 750px) {
    font-size: 1rem;
  }

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
  } @media (max-width: 750px){
    font-size: 1rem
  }
`;

function Week({year, month, week, onWeek, onYear, onMonth, myTimeZone, sumDateWithMilliseconds}) {

  const chosenWeek = ['','M', 'T', 'W', 'T', 'F', 'S', 'S', ''];
  const todayDate = new Date();

 


  const popravka = sumDateWithMilliseconds(todayDate, (-1)*myTimeZone(todayDate)).toISOString();

  console.log(`${todayDate.toISOString()} and ${popravka}`);
  const tdate = week.find(d => d.slice(0,10) === popravka.slice(0,10));
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
        {chosenWeek.map((day, i) => i===ind+9 ? <ItemToday key={i}>{day}</ItemToday> : <Item key={i}>{day}</Item>)}
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

// import React, {useState} from "react";
// import styled from 'styled-components';

// const Wrapped = styled.div`
//   background-color: #f6f6f6;
//   border: 2px solid #e6e6e6;
// `

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: auto auto auto auto auto auto auto auto;
//   width: 87%;
// `

// const Item = styled.div`
//   background-color: #f6f6f6;
//   border: 1px solid transparent;
//   padding: 20px;
//   font-size: 20px;
//   text-align: center;
//   @media (max-width: 750px) {
//     padding: 10px;
//   }
// `

// const ItemToday = styled.div`
//   background-color: red;
//   color: white;
//   border: 1px solid transparent;
//   border-radius:100%;
//   width: 30px;
//   height: 30px;
//   margin: 20px 0 0 10px ;
//   font-size: 20px;
//   text-align: center;
//   @media (max-width: 750px){
//     margin: 10px 0 0 5px ;
//   }
// `

// const Month = styled.div`
//   display: flex;
//   margin-left:13%;
//   width: 87%;
//   justify-content: space-evenly;
// `

// const Btn = styled.button`
//     margin-right: 30px;
//     border: none;
//     padding: 0;
//     background: none;
// `;
 
// const P = styled.p`
//   font-size: 1.5rem;
//   @media (max-width: 750px) {
//     font-size: 1rem;
//   }

// `

// const Arrow = styled(Btn)`
//   font-size: 2rem;
//   color: red;
//   text-decoration: none;
//   &:hover,
//   &:focus {
//     color: palevioletred;
//   }
//   &:active {
//     color: coral;
//   } @media (max-width: 750px){
//     font-size: 1rem
//   }
// `;

// function Week({year, month, week, onWeek, onYear, onMonth}) {

//   const chosenWeek = ['','M', 'T', 'W', 'T', 'F', 'S', 'S', ''];
//   const todayDate = new Date();
//   const tdate = week.find(d => d.slice(0,10) === todayDate.toISOString().slice(0,10));
//   let ind;
//   if (tdate){
//     ind = week.indexOf(tdate);
//   }
//   if (week){
//     week.forEach(d => {
//       chosenWeek.push(d.slice(8,10));
//     });
//   }

//   const getNextDate = (str, i) => {
//     const today = Date.parse(str);
//     const tomorrow = new Date(today);

//     tomorrow.setDate(tomorrow.getDate() + i);
//     return tomorrow;
// }

//   const getSequentWeek = (w, i) => {
//     let nw = w.map(d => getNextDate(d, i).toISOString())
//     return nw
//   }

//   const handleNext = () => {
//     onWeek(getSequentWeek(week, 7));
//     let sw = getNextDate(week[6], 1);
//     let next = sw.toISOString();
//     onYear(next.slice(0,4));
//     onMonth(next.slice(5,7));
//   }

//   const handleBack = () => {
//     onWeek(getSequentWeek(week, -7));
//     let sw = getNextDate(week[0], -1);
//     let previous = sw.toISOString();
//     onYear(previous.slice(0,4));
//     onMonth(previous.slice(5,7));
//   }

//   const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
//   const monthNums = ['01', '02', '03', '04', '05', '06','07', '08', '09', '10', '11', '12']

//   const toName = (m) => {
//     let ind = monthNums.indexOf(m);
//     return monthNames[ind];
//   }
  
//   return (
//     <Wrapped>
//       <Grid>
//         {chosenWeek.map((day, i) => i===ind+9 ? <ItemToday key={i}>{day}</ItemToday> : <Item key={i}>{day}</Item>)}
//       </Grid>
//       <Month>
//         <Arrow onClick={handleBack} id="back">{'<'}</Arrow>
//         <P>{year ? `${year} ${toName(month)}` : '2023'} </P>
//         <Arrow onClick={handleNext} id="next">{'>'}</Arrow>
//       </Month>
//     </Wrapped>
//   );
// }

// export default Week;