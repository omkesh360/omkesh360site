import { Box, Flex, Skeleton } from '@/components/chakra';
import { ReactNode, Suspense } from 'react';

import { Navbar, Profile } from './components';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Flex>
      <Navbar>
        <Suspense fallback={<Skeleton height="24px" />}>
          <Profile />
        </Suspense>
      </Navbar>

      <Box padding={6} width="100%" height="100vh" overflowY="scroll">
        {children}
      </Box>
    </Flex>
  );
}
