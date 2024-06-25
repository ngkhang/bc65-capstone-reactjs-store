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
import useRoute from '../../hooks/useRoute';
import { useEffect, useState } from 'react';
import { httpClient } from '../../utils/config';
import API from '../../utils/api';
import { CardItem } from '../../components';
import {
  DeliveredProcedureOutlined,
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
  RetweetOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

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
        const data = await httpClient.get(API.PRODUCT.GET_BY_ID(productId));
        if (data.alias !== productSlug) navigate('*');
        else {
          setSize(data.size[0]);
          setProduct(data);
        }
      } catch (error) {
        navigate('not-found');
      }
    };

    getDetailProduct(productId);
  }, [productId, productSlug, navigate]);

  return (
    <div className="py-8">
      {product && (
        <>
          <Row align="top" justify="space-between" className="mb-8">
            <Col span={7} className="border border-gray-400 rounded-md">
              <img
                src={product.image}
                alt={product.alias}
                className=" w-full"
              />
            </Col>
            <Col span={16}>
              <Flex className="mb-2">
                <span className="px-3 py-2 mb-2 rounded text-white text-md">
                  -35%
                </span>
              </Flex>
              <h2 className="uppercase text-3xl mb-2">{product.name}</h2>
              <Row gutter={12} className="mb-4 items-center">
                <Col>
                  <Rate
                    disabled
                    defaultValue={Math.floor(Math.random() * 3) + 3}
                    allowHalf={true}
                    className="text-sm"
                  />
                </Col>
                <Col>
                  <span className="text-sm">(150 Reviews)</span>
                </Col>
              </Row>
              <p className="text-3xl mb-4">${product.price}</p>
              <Flex gap="small" align="center" className="mb-3">
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
              <Flex gap="small" align="center" className="mb-3">
                <span>Availability</span>
                <spam>{product.quantity}</spam>
              </Flex>
              <Flex gap="small" align="center" className="mb-4">
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

              <Flex align="center">
                <Space.Compact className="mr-14" size="large">
                  <Button
                    onClick={(e) =>
                      handleChangeCountProduct(e, 'down', product.quantity)
                    }
                    icon={<MinusOutlined />}
                    className="rounded-s-md flex-grow"
                  />
                  <Input
                    className="text-center w-16"
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
                <Flex gap={5} align="center">
                  <Button size="large" className="px-10">
                    Add to Cart
                  </Button>
                  <Button size="large" className="cursor-default">
                    <HeartOutlined />
                  </Button>
                  <Button size="large" className="cursor-default">
                    <ShareAltOutlined />
                  </Button>
                </Flex>
              </Flex>
            </Col>
          </Row>

          <Row className="mb-5" align="middle" justify="space-between">
            <Col span={13}>
              <Tabs
                className="px-5"
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
                ]}
              />
            </Col>
            <Col span={10}>
              <List
                className="border-2 "
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
              <h2 className="mb-0">You Might Also Like</h2>
            </Divider>
            <Row gutter={[24, 24]}>
              {product.relatedProducts?.map((prod) => {
                return (
                  <Col span={24} xl={6} key={prod.id}>
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
