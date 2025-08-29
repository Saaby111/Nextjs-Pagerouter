import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <Layout>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in the cart yet.</p>
      ) : (
        <ul className="list-group">
          {cart.map((item) => (
            <li
              className="list-group-item d-flex justify-content-between"
              key={item.id}
            >
              <div>
                {item.name} (x{item.qty}) - ${item.price * item.qty}
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
