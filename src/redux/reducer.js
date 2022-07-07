import {
  HANDLE_USERNAME,
  HANDLE_MSG,
  CLEAR_MSG,
  PUSH_MSG,
  PUSH_MEMBERS,
  ADD_MEMBER_ID,
  REMOVE_MEMBER,

  ADD_AVATAR,
} from "./actions";

const initialState = {
  member: { username: "", color: "" },
  valuelogin: "",
  text: "",
  messages: [],
  members: [],
};

const colors = [ "darkblue"];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_USERNAME:
      return { ...state, valuelogin: action.payload };
    case ADD_MEMBER_ID:
      return {
        ...state,
        member: {
          username: state.member.username,
          id: action.payload,
          color: state.member.color,
        },
      };
    case ADD_AVATAR:
      return {
        ...state,
        member: {
          username: state.member.username,
          id: state.member.id,
          color: state.member.color,
          avatar: action.payload,
        },
      };
    case HANDLE_MSG:
      return { ...state, text: action.payload };
      case PUSH_MEMBERS: {
        let members = state.members.concat(action.payload);
        return { ...state, members: members };
      }
      case PUSH_MSG: {
        return { ...state, messages: [...state.messages, action.payload] };
      }
    case CLEAR_MSG:
      return { ...state, text: initialState.text };
    case REMOVE_MEMBER: {
      let memberToRemove = action.payload;
      let newMembers = state.members.filter(
        (clan) => clan.id !== memberToRemove.id
      );

      return { ...state, members: newMembers };
    }

    default:
      return state;
  }
}
