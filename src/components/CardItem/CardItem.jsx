/* eslint-disable react/prop-types */
import { Card, Col, ConfigProvider, Rate, Row } from 'antd';
import NotFound from '../../assets/not-found.svg';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const handleError = (e) => {
  e.target.src = NotFound;
};

const CardItem = ({ prod, typeDisplay = 'grid' }) => {
  const handleAddtoCart = (idProduct) => {
    // TODO: Handle add to cart
    console.log(idProduct);
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
              onClick={() => handleAddtoCart(prod.id)}
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
