import { useContext } from 'react';
import { AuthContext, IAuthContext } from '@shared/contexts/AuthContext';

const useAuth = (): IAuthContext => useContext(AuthContext);

export default useAuth;
