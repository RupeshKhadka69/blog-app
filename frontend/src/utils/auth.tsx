import { redirect } from '@tanstack/react-router';

export const requireAuth = async () => {
  const isAuthenticated = true ;/* your authentication logic here */
  if (!isAuthenticated) {
    throw redirect({ to: '/login' });
  }
};
