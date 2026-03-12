import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=4")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <h1 className="text-center mb-4">Welcome to MyShop 🛒</h1>
      <p className="text-center">Best place to buy amazing products at great prices!</p>

      <h3 className="mt-5">Featured Products</h3>
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center">No products available.</p>
      ) : (
        <div className="row">
          {products.map((p) => (
            <div className="col-md-3" key={p.id}>
              <div className="card mb-3">
                <img
                  src={p.image}
                  alt={p.title}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h6 className="card-title">{p.title.substring(0, 20)}...</h6>
                  <p>${p.price}</p>
                  <Link href={`/products/${p.id}`} className="btn btn-sm btn-primary">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <Link href="/products" className="btn btn-success">View All Products</Link>
      </div>
    </Layout>
  );
}