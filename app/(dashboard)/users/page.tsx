import { Flex, Heading, Skeleton, Wrap, WrapItem } from '@/components/chakra';
import { Suspense } from 'react';

import { UserTable } from './components';

export default function UserPageView() {
  return (
    <Flex width="100%" direction="column" gap={6}>
      <Flex
        width="100%"
        height="48px"
        direction="row"
        justify="space-between"
        align="center"
        gap={6}
      >
        <Heading as="h1" size="lg">
          Users
        </Heading>
      </Flex>
      <Suspense
        fallback={
          <Wrap spacing={6}>
            {Array.from({ length: 3 }).map((_, i) => (
              <WrapItem key={i}>
                <Skeleton height="40px" />
              </WrapItem>
            ))}
          </Wrap>
        }
      >
        <UserTable />
      </Suspense>
    </Flex>
  );
}
