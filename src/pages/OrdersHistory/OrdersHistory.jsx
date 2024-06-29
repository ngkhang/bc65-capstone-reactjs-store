import { GLOBAL_STATES } from '../../utils/constant';
import { Divider, Flex } from 'antd';
import { getDataJsonStorage } from '../../utils/helpers';

const formatTime = (strDate) => {
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  let today = new Date(strDate);
  return today.toLocaleDateString('en-US', options);
};

const OrdersHistory = () => {
  const userProfile = getDataJsonStorage(GLOBAL_STATES.USER_PROFILE);
  const { ordersHistory } = userProfile;

  return (
    <div>
      <h2>Order History</h2>
      <Divider />

      <div className="w-full">
        <Flex
          gap="5px"
          className="text-center font-bold text-md mb-3 py-4 bg-blue-200"
          align="center"
        >
          <span className="w-[20%]">Item</span>
          <span className="w-[30%]">Name</span>
          <span className="w-[30%] lg:w-[40%]">Description</span>
          <span className="w-[20%] lg:w-[10%]">Price</span>
        </Flex>
        {ordersHistory.map((order) => {
          return (
            <div key={order.id} className="mb-4">
              <p className="text-md mb-0 bg-slate-200 py-2">
                {formatTime(order.date)}
              </p>
              <div>
                {order.orderDetail.map((item, index) => {
                  return (
                    <Flex
                      gap="5px"
                      key={index}
                      className="capitalize"
                      align="center"
                    >
                      <img
                        className="w-[20%]"
                        src={item.image}
                        alt={item.alias}
                      />
                      <span className="w-[30%] capitalize">{item.name}</span>
                      <span className="w-[30%] lg:w-[40%] line-clamp-1 md:line-clamp-3">
                        {item.shortDescription}
                      </span>
                      <span className="w-[20%] text-center">{item.price}</span>
                    </Flex>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersHistory;
