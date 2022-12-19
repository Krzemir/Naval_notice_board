//selectors

export const getUser = state => state.users;

//actions
const createActionName = actionName => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

//action creators
export const logIn = payload => ({ payload, type: LOG_IN });
export const logOut = payload => ({ payload, type: LOG_OUT });


//reducer
const userReducer = (statePart = null, action) => {
  
  switch (action.type) {
    case LOG_IN: 
      return action.payload; 
    case LOG_OUT:
      return null;
    default:
      return statePart;
  }

}

export default userReducer;