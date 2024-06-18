import { Outlet } from 'react-router-dom';

const DefaultTemplate = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DefaultTemplate;
