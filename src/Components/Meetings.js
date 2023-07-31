function Meetings({query}) {

    const normalize = (datee) => {
        return datee.slice(0,4) + ' year ' + datee.slice(5, 7) + ' month ' + datee.slice(8, 10) + ' day ' + ' ' + datee.slice(11,16);
    }

    const describtion = (datee) => {
        return datee.slice(24);
    }

    const meetings = () => {
        return query.map((m, i) => <div key={i}><p>{normalize(m)}</p><p>{describtion(m)}</p></div> );
    }

    return (
        <div>
            <h1>Meetings</h1>
            {meetings()}
        </div>
    )
}

export default Meetings;