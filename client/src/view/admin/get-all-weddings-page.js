import React, { Component, Fragment } from 'react';
import WeddingService from '../../components/services/wedding-service';
import WeddingCard from '../../components/admin/wedding/wedding-card';
import RubberBand from 'react-reveal/RubberBand';

class AllWeddings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weddings: [],
        }
    }

    static service = new WeddingService();
    render() {
        const { weddings } = this.state;


        if (!weddings.length) {
            return (
                <div>
                    <RubberBand><h2 className="white">No weddings at the moment</h2></RubberBand>
                </div>
            )
        }
        return (
            <Fragment>
                <div id="weddings-container">
                    <h2>Weddings List:</h2>
                    <div id="all-weddings">
                        {
                            weddings.map(wedding => (
                                <WeddingCard key={wedding._id} wedding={wedding} />
                            ))

                        }
                    </div>
                </div>
            </Fragment>
        )
    }
    async componentDidMount() {
        try {
            const weddings = await AllWeddings.service.getAllWeddings();
            this.setState({ weddings })
        } catch (error) {
            console.log(error);

        }
    }
}

export default AllWeddings;
