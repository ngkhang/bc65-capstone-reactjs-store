import { Button } from 'antd';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-50">
      <div className="w-full sm:w-4/5 lg:w-3/5 p-4 sm:p-7 m-4 sm:m-0 shadow-md sm:shadow-2xl text-center bg-white">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl mb-5">OOPS!</h1>
        <p className="text-sm sm:text-lg xl:text-2xl">
          We can't find the page you are looking for.
        </p>
        <p className="text-sm sm:text-lg xl:text-2xl mb-5 sm:mb-8 xl:mb-10">
          Sorry for the inconvenience.
        </p>
        <Button type="primary" className="w-full sm:w-3/5 py-5 xl:py-6">
          <Link to="/" className="xl:text-xl">
            Go back Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
