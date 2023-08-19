import './Meetings.css';

function Meetings({query}) {

    const normalize = (datee) => {
        return 'Date ( year/month/day ): ' + datee.slice(0,4) + '/' + datee.slice(5, 7) + '/' + datee.slice(8, 10) + '   Exact time: ' + datee.slice(11,16);
    }

    const describtion = (datee) => {
        return datee.slice(24);
    }

    const meetings = () => {
        return query.map((m, i) => <div className="event" key={i}><div className="h3" ><h3>{describtion(m)}</h3></div><div className="p" ><p>{normalize(m)}</p></div></div> );
    }

    const fullfill = () => {
        if (query.length > 0){
            return meetings();
        } else {
            return <div className='empty'><p>Click on <span style={{color:'red'}}>+</span> on calendar page to plan some events. They will apear here. To delete an event click on blue rectangle in calendar, then click on <span style={{color: 'red'}}>Delete</span> button that will appear at the bottom of the calendar.</p></div>
        }
    }

    return (
        <div className="meetings">
            <h1>My events: </h1>
            {fullfill()}
        </div>
    )
}

export default Meetings;