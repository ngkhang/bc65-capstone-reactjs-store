import { useEffect, useState } from 'react';
import useRoute from '../../hooks/useRoute';
import { httpClient } from '../../utils/config';
import API from '../../utils/api';
import { CardItem } from '../../components';
import {
  Button,
  Col,
  Divider,
  Flex,
  Input,
  List,
  Rate,
  Row,
  Select,
  Space,
  Tabs,
} from 'antd';
import {
  DeliveredProcedureOutlined,
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
  RetweetOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import './DetailProduct.css';

// FEATURE: Click relate product will scroll top page

const DetailProduct = () => {
  const [size, setSize] = useState('');
  const [quantityProduct, setQuantityProduct] = useState(1);
  const { productSlug, productId, navigate } = useRoute([
    'productSlug',
    'productId',
  ]);
  const [product, setProduct] = useState({});

  const handleChangeCountProduct = (e, key = '', max) => {
    let newQuantity = e.target.value * 1;

    switch (key) {
      case 'up':
        if (quantityProduct < max) setQuantityProduct((state) => state + 1);
        break;
      case 'down':
        if (quantityProduct > 1) setQuantityProduct((state) => state - 1);
        break;
      default:
        if (
          Number.isInteger(newQuantity) &&
          newQuantity <= max &&
          newQuantity >= 1
        )
          setQuantityProduct(e.target.value * 1);
        break;
    }
  };

  useEffect(() => {
    const getDetailProduct = async (productId) => {
      try {
        const res = await httpClient.get(API.PRODUCT.GET_BY_ID(productId));
        if (res.data.content.alias !== productSlug) navigate('*');
        else {
          setSize(res.data.content.size[0]);
          setProduct(res.data.content);
        }
      } catch (error) {
        navigate('not-found');
      }
    };

    getDetailProduct(productId);
  }, [productId, productSlug, navigate]);

  return (
    <div className="px-8 md:px-0 py-10">
      {product && (
        <>
          <Row align="top" justify="space-between" className="mb-5 md:mb-8">
            <Col
              span={24}
              md={8}
              className="flex justify-center items-center border border-gray-400 rounded-md mb-4 md:mb-0"
            >
              <img
                src={product.image}
                alt={product.alias}
                className="w-1/2 md:w-full"
              />
            </Col>
            <Col span={24} md={14}>
              <Flex className="row-detail justify-between mb-2">
                <span className="px-3 py-2 rounded bg-red-600 text-white text-md">
                  -35%
                </span>
                <Flex gap={5}>
                  <Button
                    size="middle"
                    className="bg-transparent shadow-none cursor-default"
                  >
                    <HeartOutlined />
                  </Button>
                  <Button
                    size="middle"
                    className="bg-transparent shadow-none cursor-default"
                  >
                    <ShareAltOutlined />
                  </Button>
                </Flex>
              </Flex>
              <h2 className="uppercase text-xl md:text-3xl mb-2">
                {product.name}
              </h2>
              <Flex gap={10} align="center" className="row-detail">
                <Rate
                  disabled
                  defaultValue={Math.floor(Math.random() * 3) + 3}
                  allowHalf={true}
                  className="text-sm"
                />
                <span className="text-sm">(150 Reviews)</span>
              </Flex>
              <p className="text-3xl mb-4">${product.price}</p>
              <Flex gap="small" className="row-detail">
                <span>Category</span>
                <div>
                  {product.categories?.map((item) => {
                    return (
                      <Button
                        className="capitalize px-3"
                        type="text"
                        key={item.id}
                      >
                        {item.category.replace('_', ' ').toLowerCase()}
                      </Button>
                    );
                  })}
                </div>
              </Flex>
              <Flex gap="small" className="row-detail">
                <span>Select a size</span>
                <Select
                  size="large"
                  value={size}
                  defaultValue={size}
                  onChange={(value) => setSize(value)}
                  options={product.size?.map((size) => {
                    return {
                      label: size,
                      value: size,
                    };
                  })}
                />
              </Flex>

              <Flex className="row-detail">
                <Space.Compact className="mr-5" size="large">
                  <Button
                    onClick={(e) =>
                      handleChangeCountProduct(e, 'down', product.quantity)
                    }
                    icon={<MinusOutlined />}
                    className="rounded-s-md flex-grow"
                  />
                  <Input
                    className="text-center w-14"
                    value={quantityProduct}
                    onInput={(e) =>
                      handleChangeCountProduct(e, 'default', product.quantity)
                    }
                  />
                  <Button
                    onClick={(e) =>
                      handleChangeCountProduct(e, 'up', product.quantity)
                    }
                    icon={<PlusOutlined />}
                    className="rounded-e-md flex-grow"
                  />
                </Space.Compact>
                <p className="mb-0">{product.quantity} Available</p>
              </Flex>

              <Flex gap={10} className="row-detail mb-0">
                <Button
                  type="primary"
                  size="large"
                  className="w-full lg:w-0 lg:px-28"
                >
                  Add to Cart
                </Button>
              </Flex>
            </Col>
          </Row>

          <Row className="mb-5" align="middle" justify="space-between">
            <Col span={24} md={13} className="mb-3 md:mb-0">
              <Tabs
                className="md:px-5"
                defaultActiveKey="1"
                items={[
                  {
                    key: '1',
                    label: 'Product Description',
                    children: <p>{product.description}</p>,
                  },
                  {
                    key: '2',
                    label: 'Review 0',
                    children: 'Review',
                    disabled: true,
                  },
                  {
                    key: '3',
                    label: 'Video',
                    children: 'Video',
                    disabled: true,
                  },
                ]}
              />
            </Col>
            <Col span={24} md={10}>
              <List
                className="border-2"
                bordered
                itemLayout="horizontal"
                dataSource={[
                  {
                    title: 'Free Delivery',
                    description:
                      'Enter your postal code for Delivery Availability',
                    icon: <DeliveredProcedureOutlined className="text-xl" />,
                  },
                  {
                    title: 'Return Delivery',
                    description: 'Free 30 Days Delivery Return. Details',
                    icon: <RetweetOutlined className="text-xl" />,
                  },
                ]}
                renderItem={(item) => (
                  <List.Item className="p-3">
                    <List.Item.Meta
                      className="items-center"
                      avatar={item.icon}
                      {...item}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>

          <Row>
            <Divider orientation="left" orientationMargin="0" className="mb-5">
              <h2 className="mb-0 text-xl md:text-2xl">You Might Also Like</h2>
            </Divider>
            <Row gutter={[24, 24]} className="px-10 sm:px-0">
              {product.relatedProducts?.map((prod) => {
                return (
                  <Col span={24} sm={12} lg={6} key={prod.id}>
                    <CardItem prod={prod} />
                  </Col>
                );
              })}
            </Row>
          </Row>
        </>
      )}
    </div>
  );
};

export default DetailProduct;
