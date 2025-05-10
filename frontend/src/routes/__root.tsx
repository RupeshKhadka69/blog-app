import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div>This is the navbar</div>
      <Outlet />
      <div>thi sis the footer</div>
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
});
