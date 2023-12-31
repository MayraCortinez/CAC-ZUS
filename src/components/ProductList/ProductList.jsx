import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "../ProductCard/ProductCard";
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../LoadingSpinner'

function ProductList() {
  const { getProducts } = useAuth();
  let [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchProducts();
  }, [getProducts]);


  useEffect(() => {
    getProducts();
    setTimeout(()=> {
      setLoading(false);
    }, 4000);
  }, []);

  const storage = getStorage();

  products.map(async prod => {
    const storageRef = ref(storage, `${prod.img}`);
    const urlImg = await getDownloadURL(storageRef);
    console.log(urlImg);
  })

  return (
    <Container fluid className="mt-5 pt-2 pb-2 mb-5">
      <Row className="pt-5">
        {loading ?
          (<LoadingSpinner style={{ height: "550px" }} className='text-primary d-flex align-items-center justify-content-center'/>)
          :
          (products?.map((product) => (
            <Col key={product.id} className="pt-5 px-3">
              <ProductCard
                id={product.id}
                color={product.color}
                descripcion={product.descripcion}
                detalle={product.detalle}
                img={product.img}
                marca={product.marca}
                modelo={product.modelo}
                precio={product.precio}
                talle={product.talle}
              />
            </Col>
          )))
        }
      </Row>
    </Container>
  );
}

export default ProductList;
