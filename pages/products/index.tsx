import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <h2>Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="row">
          {products.map((p) => (
            <div className="col-md-4" key={p.id}>
              <div className="card mb-3">
                <img
                  src={p.image}
                  alt={p.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text">Price: ${p.price}</p>
                  <Link href={`/products/${p.id}`} className="btn btn-primary">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}