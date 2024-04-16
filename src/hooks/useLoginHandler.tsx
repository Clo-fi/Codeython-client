import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/AuthStore';
import { useEffect } from 'react';

const useLoginHandler = () => {
  const navigate = useNavigate();
  const isLogined = useAuthStore(state => state.isLogined);

  useEffect(() => {
    if (!isLogined) {
      navigate('/');
    }
  }, [isLogined, navigate])
}

export default useLoginHandler;
