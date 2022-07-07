import React from "react";
import { connect } from "react-redux";
import { handleMsgChange } from "../redux/actions";
import Button from 'react-bootstrap/Button';

const Input = (props) => {
  return (
    <form onSubmit={props.handleSend} id="inputMsg">
      <input
        id="msg"
        value={props.text}
        placeholder="Kreni čavljati..."
        onChange={props.handleMsgChange}
      ></input>
      <Button  variant="secondary" type="submit" onClick={props.handleSend}>
        <img src="../media/send.png" alt="send" />
      </Button>
    </form>
  );
};

function mapStateToProps(state) {
  return {
    text: state.text,
  };
}

const mapDispatchToProps = {
  handleMsgChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
