import React from 'react';
import Fade from 'react-reveal/Fade';


class UserHomePageCard extends React.Component {

    
    nameCreator(input) {
        let inputTostring = input.toString();
        let string = inputTostring.split("");
        let firstLetter = string.splice(0, 1);
       
        let name = `${firstLetter.toString().toUpperCase()}${string.join("")}`;
        return name;
    }
    render() {

        const weddingInfo = this.props.wedding;


        try {
            const weddingDateToArray = weddingInfo.weddingDate.split('-');
            let brideName = this.nameCreator(weddingInfo.bride);
            let groomName = this.nameCreator(weddingInfo.groom);
            let day = weddingDateToArray[2].toString();
            let month = weddingDateToArray[1].toString();
            let year = weddingDateToArray[0].toString();
            let dateToString = new Date(`${month} ${day}, ${year}`)
            let getDay = dateToString.getDay();
            let getMonth = dateToString.getMonth();
            let dayToString = '';
            let monthToString = '';
            let daysOfWeek = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
            let monthsOfYear = "January February March April May June July August September October November December".split(" ");
            let ceremonyObj = {

                ceremonyPlace: weddingInfo.ceremonyPlace,
                ceremonyStart: weddingInfo.ceremonyStart,
                // ceremonyEnd: weddingInfo.ceremonyEnd,
            }
            let partyObj = {
                partyPlace: weddingInfo.partyPlace,
                partyStart: weddingInfo.partyStart,
                // partyEnd: weddingInfo.partyEnd,
            }

            for (let n = 0; n < daysOfWeek.length; n++) {
                if (n === getDay) {
                    dayToString = daysOfWeek[n];
                }
            }

            for (let k = 0; k < monthsOfYear.length; k++) {
                if (k === getMonth) {

                    monthToString = monthsOfYear[k];
                }

            }
            return (
                <div className="user-page-container" >

                    <div className="couple">
                        <Fade left delay={2000} >
                            <h1>{brideName} &amp; {groomName}</h1>
                        </Fade>
                        <Fade left delay={3000}>
                            <h2>We Are Getting Married!</h2>
                        </Fade>
                    </div>
                    <div className="wedding-date"><br />
                        <Fade left delay={4000}><h2>Dear family and friends,</h2></Fade><br />
                        <Fade left delay={5000}><h3>on {dayToString} - {monthToString} - {year}</h3></Fade><br />
                        <Fade left delay={5000}><p>We invite you to celebrate with us our wedding!</p></Fade>
                    </div>

                    <div className="temp">
                        <div className="wedding-events-container">
                            <Fade left delay={1500}>
                                <h2>Wedding Event:</h2></Fade>
                            <div className="event" id="main-ceremony">
                                <Fade left delay={1000}>
                                    <h3>Main Ceremony:</h3>
                                    <span>{ceremonyObj.ceremonyStart} PM</span>
                                    <span>{dayToString} {day}</span>
                                    <span>{monthToString}, {year}</span>
                                    <p>Far far away at <strong>{ceremonyObj.ceremonyPlace}</strong> behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                                </Fade>
                            </div>
                            <div className="event" id="wedding-party">
                                <Fade left delay={1000}>
                                    <h3>Wedding Party:</h3>
                                    <span>{partyObj.partyStart} PM</span>
                                    <span>{dayToString} {day}</span>
                                    <span>{monthToString}, {year}</span>
                                    <p>Far far away at <strong>{partyObj.partyPlace}</strong> behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                                </Fade>
                            </div>
                        </div>
                    </div>
                </div >
            )

        } catch (error) {
            return (
                <div className="user-page-container" >

                    <div className="couple">
                        <Fade left delay={2000} >
                            <h1>{weddingInfo.bride} &amp; {weddingInfo.groom}</h1>
                        </Fade>
                        <Fade left delay={3000}>
                            <h2>We Are Getting Married!</h2>
                        </Fade>
                    </div>
                    <div className="wedding-date"><br />
                        <Fade left delay={4000}><h2>Dear family and friends,</h2></Fade>
                        <Fade left delay={5000}><p>We invite you to celebrate with us our wedding!</p></Fade>
                    </div>
                </div>
            )
        }

    }

}
export default UserHomePageCard;
