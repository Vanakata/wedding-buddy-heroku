import React, { Component, Fragment } from 'react';
import GuestService from '../services/guest-list-service';
import Fade from 'react-reveal/Fade';

class GuestCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

            value: '',
            error: '',
            isUpdate: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    static service = new GuestService();

    handleSubmit = (event) => {
        event.preventDefault();

        let credentials = this.state.value;

        const id = this.props.guest._id;

        this.setState({
            error: '',
            isUpdate: true,
        }, async () => {
            try {
                const result = await GuestCard.service.statusChange(id, { isComing: credentials });
                if (!result.success) {
                    const errors = Object.values(result.errors).join(" ");
                    throw new Error(errors)
                } else {
                    this.setState({ isUpdate: true })

                }
            } catch (error) {
                console.log(error);
            }
            
        })
    }
    handleDelete = (event) => {

        event.preventDefault();
        const id = this.props.guest._id;
        this.setState({ error: '' }, async () => {
            try {
                const result = await GuestCard.service.delete(id);
                if (!result.success) {
                    const errors = Object.values(result.errors).join(" ");
                    throw new Error(errors)
                } else {

                    window.location.reload();


                }

            } catch (error) {
                console.log(error);
            }
        })

    }

    handleOptionChange = (event) => {
        this.setState({ value: event.target.value });
    }
    render() {

        const { guest } = this.props;

        return (
            <div id="guest-on-line">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                            {
                                this.state.isUpdate === true
                                    ?
                                    <Fragment>
                                        <h6 className="status">{this.state.value}</h6>
                                        <Fade right ><div className="confirm-message">
                                            <p>You have checked</p>
                                        </div>
                                        </Fade>
                                    </Fragment>
                                    :
                                    <h6 className="status">{guest.isComing}</h6>
                            }

                            <h5>{guest.firstName} {guest.lastName}</h5>
                            <span id="isComing">is coming:</span>
                            <div>
                                <select className="select-box" onChange={this.handleOptionChange}>
                                    <option value="None">--</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="guest-button">
                            <input type="submit" className="button" value="Confirm attendence" id="confirm-status" />
                            <input onClick={this.handleDelete} type="button" className="button" value="Delete guest" id="delete-guest" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default GuestCard;