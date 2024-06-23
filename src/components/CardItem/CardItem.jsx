/* eslint-disable react/prop-types */
import { Card, ConfigProvider, Rate } from 'antd';
import NotFound from '../../assets/not-found.svg';
import { Link } from 'react-router-dom';

const handleError = (e) => {
  e.target.src = NotFound;
};

const CardItem = (props) => {
  const { prod } = props;

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
        styles={{
          body: {
            flexGrow: 1,
          },
        }}
        actions={[
          <button
            className="w-full rounded-md py-2 lg:py-4 cursor-pointer bg-white hover:bg-blue-400 hover:text-white transition-all"
            onClick={() => {
              console.log('1');
            }}
            key="add"
          >
            Add to Cart
          </button>,
        ]}
      >
        <Link to={`products/${prod.alias}`} className="inline-block">
          <img
            alt={prod.alias}
            src={prod.imgLink}
            onError={handleError}
            className="w-full"
          />
        </Link>

        <Link
          to={`products/${prod.alias}`}
          className="inline-block text-inherit"
        >
          <h4 className="text-lg lg:text-xl capitalize mb-2">{prod.name}</h4>
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
        />
      </Card>
    </ConfigProvider>
  );
};

export default CardItem;
