import { connect } from "react-redux";
import { handleUsername } from "../redux/actions";
import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
const LogIn = (props) => {
 
    return (
      <div className="login">
        <form id="LoginForm">
          <h1>Dobrodošli u Algebra Chat App.</h1>
          <h4>Upišite svoje ime:</h4>
          <div>
            <input id="username" onChange={props.handleUsername}></input>
              <Link to="/Soba">
              <Button variant="secondary">  Uđi u chat</Button>
              </Link>
          </div>
        </form>
      </div>
    );
  
};

function mapStateToProps(state) {
  return {
    member: state.member,
    valuelogin: state.valuelogin,
  };
}

const mapDispatchToProps = {

  handleUsername,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
