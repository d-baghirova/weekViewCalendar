import './Home.css';

function Home (){
    return (
        <div className="home">
            <img className='big' src='/assets/tm.png' />
            <div className="text">
            <h1>Interactive Calendar</h1>
            <p>
                An interactive calendar is a digital tool that allows users to input and organize their schedules, events, and appointments. 
                <br /><br />
                This calendar saves changes you made in your browser of your device so unfortunately it doesn't have feature of synchronization across your multiple devices. 
                <br /><br />
                Additionally, our interactive calendar come with additional features such as reminders and notifications. However, they mostly work on computers, not phones.
            </p>
            </div>
            
        </div> 
    )
}

export default Home;