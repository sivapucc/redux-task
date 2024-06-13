const initialState = {
  visible: true,
  cart: [],
  total: [],
};

function countReducer(state = initialState, action) {
  switch (action.type) {
    case "Add_To_Cart":
      return {
        ...state,
        cart: [...state.cart, action.payload],
        visible: false,
        total: [...state.total, action.payload],
      };
    case "Remove_From_Cart":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
        visible: state.cart.length > 1 ? false : true,
        total: state.total.filter((item) => item.id !== action.payload.id),
      };
    case "qty":
      // console.log(action.payload.e.target.value);
      return {
        ...state,
        total: state.total.map((ele, idx) =>
          idx === action.payload.i
            ? { ...ele, price: ele.price * action.payload.e.target.value }
            : ele
        ),
      };
    default:
      return state;
  }
}

export default countReducer;
