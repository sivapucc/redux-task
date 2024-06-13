import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import products from "./store/data/data";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";

const MainContent = () => {
  const dispatch = useDispatch();
  const { visible } = useSelector((state) => state.countReducer);
  const { cart, total } = useSelector((state) => state.countReducer);
  const subtot = total.map((ele) => ele.price);
  const subvalue = subtot.reduce((acc, ce) => acc + ce, 0);

  function handleQty(e, i) {
    dispatch({ type: "qty", payload: { e, i } });
  }
  function handleEve(e, ele) {
    if (e.target.className === "btn btn-primary") {
      e.target.className = "btn btn-danger";
      e.target.innerText = "Remove cart";
      dispatch({ type: "Add_To_Cart", payload: ele });
    } else {
      e.target.className = "btn btn-primary";
      e.target.innerText = "Add to cart";
      dispatch({ type: "Remove_From_Cart", payload: ele });
    }
  }
  return (
    <div className="card-containers">
      <div className="col1">
        {products.map((ele, i) => (
          <Card border="secondary" style={{ width: "18rem", height: "550px" }}>
            <Card.Header>{ele.title}</Card.Header>
            <Card.Img variant="top" src={ele.thumbnail} className="cart-img" />
            <Card.Body>
              <Card.Text>{ele.description}</Card.Text>
              <Card.Title>$ {ele.price}</Card.Title>

              <Button variant="primary" onClick={(e) => handleEve(e, ele)}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      {!visible && (
        <div className="col2">
          {console.log(subtot)}
          <h1>Cart Items</h1>
          {cart.map((item, i) => (
            <Card border="success" style={{ width: "18rem" }}>
              <Card.Header>{item.title}</Card.Header>
              <Card.Body>
                <img src={item.thumbnail} alt="" className="cart-img" />
                <div>Price: $ {item.price}</div>

                <div className="carditems">
                  <span>Qty:</span>{" "}
                  <select onChange={(e) => handleQty(e, i)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                </div>
              </Card.Body>
              <Card.Header
                style={{
                  textAlign: "left",
                }}
              ></Card.Header>
              <Card.Header
                style={{
                  textAlign: "left",
                }}
              ></Card.Header>
            </Card>
          ))}
          <Card border="warning" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Text>SUBTOTAL:{subvalue}</Card.Text>
              <Card.Text>
                SHIPPING: $
                {cart.length > 1 ? (
                  <span style={{ color: "green" }}>"FREE"</span>
                ) : (
                  <span style={{ color: "red" }}>50</span>
                )}
              </Card.Text>
              <Card.Title>
                TOTAL: {cart.length > 1 ? subvalue : subvalue + 50}
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainContent />
      </Provider>
    </div>
  );
}

export default App;
