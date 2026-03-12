import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import { useCart } from "../../context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const { addToCart } = useCart();

  if (!product) return <Layout><p>Product not found</p></Layout>;

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <button
            className="btn btn-success"
            onClick={() => addToCart({
              id: product.id,
              name: product.title,
              price: product.price,
              description: product.description,
            })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    
    // Check if the response is OK
    if (!res.ok) {
      console.error(`Failed to fetch product ${id}: ${res.statusText}`);
      return { notFound: true };
    }

    const product: Product = await res.json();
    return { props: { product } };

  } catch (err) {
    console.error("Error fetching product:", err);
    return { notFound: true };
  }
};
