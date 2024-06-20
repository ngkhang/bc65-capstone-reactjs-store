import { Outlet } from 'react-router-dom';

const UserAuthTemplate = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-200">
      <Outlet />
    </div>
  );
};

export default UserAuthTemplate;
