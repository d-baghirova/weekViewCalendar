import './Notifications.css';

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }



function Notifications({notificationType, setNotificationType}) {

    const options = [

        { label: '1 week before event', value: `${7*24*60}` },
        { label: '2 days before event', value: `${2*24*60}` },
        { label: '1 day before event', value: `${24*60}` },
        { label: '3 hours before event', value: `${3*60}` },
        { label: '2 hours before event', value: `${2*60}` },
        { label: '1 hour before event', value: `${60}` },
        { label: '45 minutes before event', value: `${45}` },
        { label: '30 minutes before event', value: `${30}` },
        { label: '15 minutes before event', value: `${15}` },
        { label: '10 minutes before event', value: `${10}` },
        { label: '5 minutes before event', value: `${5}` }

    ];
     
    const handleChange = (event) => {
     
        setNotificationType(event.target.value);
        
    };

    const work = () => {
        Notification.requestPermission().then(perm => {
            new Notification('Thank you',
            {body: "for using our notifications"}
            )
        })
    }

    return(
        <div className="notifications">

          <img className='mini' src='/assets/calendar-clock.png' />

          <div className='t'>
          <p className='textt'>After clicking on "Notify me" button, you must get a pop-up with question or a notification. If you don't get neither of them, try to turn on notifications in settings of your browser or in settings of your device.<br /><br /> Unfortunately, this feature doesn't work at most of the phones. But it works on computers.</p>
            <button className="btn" onClick={work}>Notify me</button>
            <select className="n" value={notificationType} onChange={handleChange}>

                {options.map((option, i) => (
                    <option key={i} value={option.value}>{option.label}</option>
                ))}

            </select>
            </div>
            
        </div>
    );
}

export default Notifications;