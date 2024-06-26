import { useEffect, useState } from 'react';
import { httpClient } from '../../utils/config';
import API from '../../utils/api';
import { Col, Row } from 'antd';
import { CardItem } from '../../components';

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProduct = async () => {
      const res = await httpClient.get(API.PRODUCT.GET_ALL);
      setProducts(res.data.content);
    };

    getAllProduct();
  }, []);

  return (
    <div className="py-6 md:py-10">
      <h1 className="text-2xl md:text-4xl text-center mb-4 md:mb-8">
        Our Products
      </h1>

      <Row gutter={[24, 24]}>
        {products.length > 0 &&
          products.map((prod) => {
            return (
              <Col key={prod.id} span={12} md={8} lg={6} className="p-0">
                <CardItem prod={prod} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Home;
