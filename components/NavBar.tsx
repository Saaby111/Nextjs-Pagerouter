import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link href="/" className="navbar-brand">MyShop</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link href="/" className="nav-link">Home</Link></li>
          <li className="nav-item"><Link href="/products" className="nav-link">Products</Link></li>
          <li className="nav-item"><Link href="/cart" className="nav-link">Cart 🛒 ({cart.length})</Link></li>
          <li className="nav-item"><Link href="/about" className="nav-link">About</Link></li>
          <li className="nav-item"><Link href="/contact" className="nav-link">Contact us</Link></li>
        </ul>
      </div>
    </nav>
  );
}
