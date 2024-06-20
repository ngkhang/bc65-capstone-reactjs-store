import { useNavigate, useParams } from 'react-router-dom';

const useRoute = () => {
  const param = useParams();
  const navigate = useNavigate();

  return {
    param,
    navigate,
  };
};

export default useRoute;
