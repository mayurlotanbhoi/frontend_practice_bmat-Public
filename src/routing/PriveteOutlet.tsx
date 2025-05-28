
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';

const PrivateOutlet = () => {
    const {  isAuthenticated } = useAppSelector((state) => state.auth);

    console.log("isAuthenticated" , isAuthenticated);
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateOutlet;
