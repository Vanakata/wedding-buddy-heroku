import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import GuestCard from '../../../components/user/guest-card'
import GuestService from '../../../components/services/guest-list-service'
import RubberBand from 'react-reveal/RubberBand';

class GuestList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: [],
        }
    }

    static service = new GuestService();

    render() {
        const { guests } = this.state;

        function compare(a, b) {
            if (guests.length) {

                const nameA = a.firstName;
                const nameB = b.firstName;

                let comparison = 0;

                if (nameA > nameB) {
                    comparison = 1;
                } else if (nameA < nameB) {
                    comparison = -1;
                }
                return comparison;
            }
            guests.sort(compare);
        }

        if (!guests.length || guests === "Guest list is empty") {
            return (
                <div id="no-guests-message">
                    <RubberBand>
                        <h1>No guests</h1>
                        <Link to="/guest-list/create"><h5>Click here to add guests</h5></Link>
                    </RubberBand>
                </div>
            )
        }


        return (
            <Fragment>
                <div className="guest-container">
                    <div className="guests">

                        <h3>Guest List:</h3>
                        <div id="status-question-container">
                            <span id="status-question">Please confirm your attendance:</span>
                           
                            <span id="check-attendence">Check here</span>
                        </div>

                        {
                            guests.map(guest => (
                                < GuestCard key={guest._id} guest={guest} />

                            ))
                        }
                        < p id="total-guests"> Total guests:{guests.length}</p>
                    </div>
                </div>
            </Fragment >
        )
    }
    async componentDidMount() {

        try {

            const guests = await GuestList.service.getAllGuests();
            this.setState({ guests })

        } catch (error) {
            console.log(error)
        }
    }
}


export default GuestList;