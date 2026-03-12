import Layout from "../../components/Layout";
import Link from "next/link";
import { GetServerSideProps } from "next";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <Layout>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products available at the moment.</p>
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://${req.headers.host}`;
    const res = await fetch(`${baseUrl}/api/products`);

    if (!res.ok) {
      const text = await res.text();
      console.error("Failed to fetch products via API route:", text);
      return { props: { products: [] } };
    }

    const products: Product[] = await res.json();
    return { props: { products } };
  } catch (err) {
    console.error("Error fetching products:", err);
    return { props: { products: [] } };
  }
};