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
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();

  return { props: { products } };
};
