import { useEffect } from 'react';
import { getDataTextStorage } from '../../utils/helpers';
import { GLOBAL_STATES, REDUCERS, SERVICES } from '../../utils/constant';
import { useRedux, useRoute } from '../../hooks';
import { Avatar, Button, Card, Divider, Flex, Input, Space, Table } from 'antd';
import './Cart.css';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
  deleteProduct,
  updateQtyProduct,
} from '../../redux/reducers/cartReducer';

const SHIPPING_CODE = 10;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, { name, image }) => (
      <Flex gap="10px" align="center">
        <Avatar src={image} alt={name} size="large" shape="square" />
        <p className="capitalize m-0">{name}</p>
      </Flex>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    className: 'text-center',
  },
  {
    title: 'Subtotal',
    dataIndex: 'subTotal',
    key: 'subTotal',
    className: 'text-center',
  },
];

const getTotalPriceProduct = (orderList) => {
  return orderList.reduce(
    (total, item) => (total += item.productDetail.price * item.quantity),
    0,
  );
};

const Cart = () => {
  const { navigate } = useRoute();
  const accessToken = getDataTextStorage(SERVICES.ACCESS_TOKEN);
  const state = useRedux(REDUCERS.CART_REDUCER, GLOBAL_STATES.CARTS);
  const { dispatch } = useRedux();

  const data = state[GLOBAL_STATES.CARTS].map((prod) => {
    const { productDetail, quantity } = prod;
    return {
      key: productDetail.id,
      image: productDetail.image,
      name: productDetail.name,
      price: productDetail.price,
      subTotal: productDetail.price * quantity,
      quantity,
    };
  });

  const subTotal = getTotalPriceProduct(state[GLOBAL_STATES.CARTS]);
  const handleDelete = (productId) => {
    const action = deleteProduct(productId);
    dispatch(action);
  };

  const handleUpdateQtyProduct = (actionType, { quantity }) => {
    console.log(actionType, quantity);
    // const action = updateQtyProduct(actionType, count);
    // dispatch(action);
  };

  const handleCheckOut = () => {
    // TODO: Check out
  };
  useEffect(() => {
    // BUG: accessToken khi expired
    if (!accessToken) navigate('/auth/signin');
  }, [accessToken, navigate]);

  return (
    <div className="py-6 md:py-10">
      <h1 className="text-2xl md:text-4xl text-center">Shopping Cart</h1>
      <Divider />

      <Flex gap="12px">
        <div className="w-[65%] bg-pink-400">
          <Table
            columns={[
              ...columns,
              {
                // title: 'Action',
                key: 'action',
                className: 'text-center',
                render: (_, { key }) => (
                  <Button
                    onClick={() => handleDelete(key)}
                    icon={<DeleteOutlined />}
                    // className="rounded-e-md flex-grow"
                  />
                ),
              },
              {
                title: 'Qty',
                key: 'qty',
                className: 'text-center',

                render: (_, record) => (
                  // TODO: Handle Change QTy
                  <Space.Compact size="middle">
                    <Button
                      onClick={() => handleUpdateQtyProduct('down', record)}
                      icon={<MinusOutlined />}
                      className="rounded-s-md flex-grow "
                    />
                    <Input
                      className="text-center w-12"
                      value={record.quantity}
                      onInput={() => handleUpdateQtyProduct('default', record)}
                    />
                    <Button
                      onClick={() => handleUpdateQtyProduct('up', record)}
                      icon={<PlusOutlined />}
                      className="rounded-e-md flex-grow"
                    />
                  </Space.Compact>
                ),
              },
            ]}
            dataSource={data}
          />
        </div>

        <div className="w-[35%]">
          <Card title="Order Summary" className="bg-pink-200">
            <div>
              <p>Promo Code</p>
              <Input placeholder="Enter promo code..." />
            </div>
            <Divider />
            <div className="detail-payment">
              <p>
                <span>Subtotal:</span>
                <span>{subTotal}</span>
              </p>
              <p>
                <span>Promo:</span>
                <span>-</span>
              </p>
              <p>
                <span>Shipping fee:</span>
                <span>{subTotal && SHIPPING_CODE}</span>
              </p>
            </div>
            <Divider />
            <div className="detail-payment">
              <p className="mb-7 uppercase font-bold text-xl">
                <span>Total</span>
                {/* BUG: Total + SHIPPING_CODE*/}
                <span>{subTotal + SHIPPING_CODE}</span>
              </p>
            </div>
            <Button
              type="primary"
              className="w-full py-5"
              onClick={handleCheckOut}
            >
              Check out
            </Button>
          </Card>
        </div>
      </Flex>
    </div>
  );
};

export default Cart;
