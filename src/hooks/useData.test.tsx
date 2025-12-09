import { expect, test } from 'vitest';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react-hooks';
import useData from 'hooks/useData';

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

test('App component renders without crashing', async () => {
  const wrapper = createWrapper();
  const { result } = renderHook(async () => useData(), { wrapper });
  expect(result.error).toBeUndefined();
});
