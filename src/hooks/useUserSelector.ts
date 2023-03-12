import { useSelector } from 'react-redux';
import { User } from '../utils/reducers/User.reducer';

/**
 * This hook returns the user stored in the redux store
 *
 * @returns Stored User from the redux store
 */
export default function useUserSelector() {
  const user: User = useSelector((state: User) => state);

  return user;
}

export function useAccessToken(): string {
  let accessToken = useUserSelector().accessToken;
  accessToken = accessToken ? accessToken : '';

  return accessToken;
}
