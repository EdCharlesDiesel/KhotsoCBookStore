export function reducer(state: any, action: { type: any; payload: any; }) {
  switch (action.type) {

    case 'MASK_USER_NAME':
      return {
        ...state,
        maskUserName: action.payload
      };

    default:
      return state;
  }
}
