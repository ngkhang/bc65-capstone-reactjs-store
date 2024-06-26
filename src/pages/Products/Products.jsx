import { useEffect, useState } from 'react';
import { httpClient } from '../../utils/config';
import API from '../../utils/api';
import { Button, Col, Divider, Row, Select } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { CardItem } from '../../components';
import BgHeader from '../../assets/bg-02.jpg';

// FEATURE: Load more products by button

const modelDisplay = {
  grid: {
    type: 'grid',
    config: {
      span: 12,
      md: 8,
      lg: 6,
    },
  },
  list: {
    type: 'list',
    config: {
      span: 24,
      md: 12,
      xxl: 8,
    },
  },
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [typeDisplay, setTypeDisplay] = useState(modelDisplay.grid);

  const handleChangeDisplay = () => {
    let switchDisplay = typeDisplay.type === 'grid' ? 'list' : 'grid';
    setTypeDisplay(modelDisplay[switchDisplay]);
  };

  const handleSort = (value) => {
    // TODO: Handle sort product
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const getAllProduct = async () => {
      const res = await httpClient.get(API.PRODUCT.GET_ALL);
      setProducts(res.data.content);
    };

    getAllProduct();
  }, []);

  return (
    <div className="pb-6 md:pb-10">
      <div className="relative min-h-[25vh] mb-3 md:mb-6">
        <img
          src={BgHeader}
          alt="background products page"
          className="absolute top-0 left-0 w-full h-full opacity-65 object-cover"
        />
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 mb-0 text-4xl md:text-5xl text-white">
          Shop
        </h1>
      </div>

      <h3 className="mb-4 font-medium text-2xl md:text-3xl">All products</h3>
      <Row gutter={[12]} className="items-center justify-end">
        <Col
          span={14}
          sm={10}
          md={7}
          lg={6}
          className="flex items-center mr-2 lg:mr-3"
        >
          <span className="mr-2 text-md">Sort By</span>
          <Select
            className="flex-grow"
            defaultValue="default"
            onChange={handleSort}
            options={[
              {
                value: 'default',
                label: 'Default',
              },
              {
                value: 'available',
                label: 'Available',
              },
              {
                value: 'priceHL',
                label: 'Price: High-Low',
              },
              {
                value: 'priceLH',
                label: 'Price: Low-High',
              },
            ]}
          />
        </Col>
        <Col span={7} sm={4} lg={3} xl={2}>
          <Button
            type="text"
            className="w-full flex items-center p-2 hover:text-inherit text-xl bg-transparent"
            onClick={handleChangeDisplay}
          >
            <span
              className={`hover:text-blue-500 ${
                typeDisplay.type === 'list' && 'text-blue-500'
              }`}
            >
              <BarsOutlined />
            </span>
            <Divider className="border-gray-600" type="vertical" />
            <span
              className={`hover:text-blue-500 ${
                typeDisplay.type === 'grid' && 'text-blue-500'
              }`}
            >
              <AppstoreOutlined />
            </span>
          </Button>
        </Col>
      </Row>

      <Divider className="my-8" />

      <Row gutter={[24, 24]}>
        {products.map((prod) => {
          return (
            <Col key={prod.id} {...typeDisplay.config} className="p-0">
              <CardItem prod={prod} typeDisplay={typeDisplay.type} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Products;
