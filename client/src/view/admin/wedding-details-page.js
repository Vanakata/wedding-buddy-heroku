import React, { Component, Fragment } from "react";
import WeddingService from "../../components/services/wedding-service";
import { UserConsumer } from "../../components/User-Context/User-Context";
import Bounce from "react-reveal/Bounce";
import { Redirect } from "react-router-dom";
// import UploadImage from '../components/upload-data/upload-data-filepond';
import axios from "axios";

class WeddingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wedding: {},
      selectedFile: null
    };
    this.handleDelete = this.handleDelete.bind(this);
  }
  static service = new WeddingService();

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
      isDelete: false
    });
  };
  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios.post("http://localhost:5000/upload/upload", data).then(res => {
      console.log(res.statusText);
    });
  };
  handleDelete(event) {
    event.preventDefault();
    const id = this.state.wedding._id;

    this.setState({ error: "" }, async () => {
      try {
        const result = await WeddingDetails.service.delete(id);
        if (!result.success) {
          const errors = Object.values(result.errors).join(" ");
          throw new Error(errors);
        } else {
          this.setState({ isDelete: true });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  render() {
    const { wedding } = this.state;

    if (wedding === undefined) {
      return (
        <div>
          <h2>Wedding does not exists.</h2>
        </div>
      );
    } else if (this.state.isDelete === true) {
      return <Redirect to="/admin/all" />;
    }
    return (
      <Fragment>
        <div className="wedding-details-container">
          <Bounce top>
            <div className="wedding-details">
              <h1>{wedding.username}`s wedding</h1>
              <h5>Username: {wedding.username}</h5>
              <h5>E-mail: {wedding.email}</h5>
              <h5>Date of wedding: {wedding.weddingDate}</h5>
              <h5>Happy groom: {wedding.groom}</h5>
              <h5>Adorable bride: {wedding.bride}</h5>
              <h5>Best man: {wedding.bestMan}</h5>
              <h5>Godmother: {wedding.godmother}</h5>
              <h5>Ceremony at: {wedding.ceremonyPlace}</h5>
              <h5>Ceremony starts: {wedding.ceremonyStart}</h5>
              <h5>Wedding party at: {wedding.partyPlace}</h5>
              <h5>Wedding party starts: {wedding.partyStart}</h5>
            </div>
          </Bounce>
          <div>
            <input
              type="button"
              onClick={this.handleDelete}
              value="Delete"
            ></input>
          </div>
        </div>
      </Fragment>
    );
  }
  async componentDidMount() {
    try {
      const weddingId = this.props.match.params.id;
      const weddings = await WeddingDetails.service.getAllWeddings();
      const wedding = weddings.find(wedding => wedding._id === weddingId);

      this.setState({ wedding });
    } catch (error) {
      alert(error.toString());
    }
  }
}
const WeddingDetailsWithContext = props => {
  return (
    <UserConsumer>
      {({ username }) => <WeddingDetails {...props} username={username} />}
    </UserConsumer>
  );
};
export default WeddingDetailsWithContext;
