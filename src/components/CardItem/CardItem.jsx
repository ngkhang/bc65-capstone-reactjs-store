/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useRedux } from '../../hooks';
import { addProductAction } from '../../redux/reducers/cartReducer';
import { Card, Col, ConfigProvider, Rate, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import NotFound from '../../assets/not-found.svg';
import { getDataTextStorage } from '../../utils/helpers';
import { SERVICES } from '../../utils/constant';

const handleError = (e) => {
  e.target.src = NotFound;
};

const CardItem = ({ prod, typeDisplay = 'grid' }) => {
  const { dispatch } = useRedux();

  const handleAddtoCart = (prod) => {
    const orderProd = {
      productDetail: prod,
      quantity: 1,
    };

    const action = addProductAction(orderProd);
    dispatch(action);
    let accessToken = getDataTextStorage(SERVICES.ACCESS_TOKEN);
    if (!accessToken)
      console.log('Thêm sản phẩm thành công. Vui lòng đăng nhập');
  };

  let configRowCol = {
    row: typeDisplay === 'grid' ? 'flex-col' : 'flex-row',
    col: typeDisplay === 'grid' ? [24, 24] : [10, 14],
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            actionsLiMargin: 0,
          },
        },
      }}
    >
      <Card
        className="h-full flex flex-col justify-between border-none cursor-default"
        hoverable
      >
        <Row gutter={[24, 24]} className={`${configRowCol.row}`}>
          <Col span={configRowCol.col[0]}>
            <Link
              to={`/products/${prod.alias}/${prod.id}`}
              className="inline-block w-full"
            >
              <img
                alt={prod.alias}
                src={prod.image}
                onError={handleError}
                className="w-full"
              />
            </Link>
          </Col>

          <Col span={configRowCol.col[1]}>
            <Link
              to={`/products/${prod.alias}/${prod.id}`}
              className="inline-block text-inherit"
            >
              <h4 className="text-lg lg:text-xl capitalize mb-2">
                {prod.name}
              </h4>
            </Link>
            {prod.price > 0 && (
              <p className="text-sm font-bold">
                $<span className="text-xl">{prod.price}</span>
              </p>
            )}
            <Rate
              disabled
              defaultValue={Math.floor(Math.random() * 3) + 3}
              allowHalf={true}
              className="mb-5"
            />

            {typeDisplay === 'list' && (
              <p className="line-clamp-3 mb-4">{prod.shortDescription}</p>
            )}
            <button
              className="w-full py-1 lg:py-2 cursor-pointer uppercase font-bold hover:text-white border border-gray-600 bg-white hover:bg-gray-600"
              onClick={() => handleAddtoCart(prod)}
              key="add"
            >
              <PlusOutlined /> add
            </button>
          </Col>
        </Row>
      </Card>
    </ConfigProvider>
  );
};

export default CardItem;
