import { Flex, Heading, Skeleton, Wrap, WrapItem } from '@/components/chakra';
// import { Suspense } from 'react';import { MAX_PROJECTS } from '@/lib/constants';
// import { getSession } from '@/lib/auth';
// import { prisma } from '@/lib/prisma';
// import { UserRole } from '@/types';
import { CreateNewButton, Projects } from './components';

export default async function ProjectsPageView() {
  // const { session } = await getSession();

  // const isAdmin = session?.user?.role === UserRole.ADMIN;

  // const projectsNum = await prisma.project.count({
  //   where: isAdmin ? {} : { users: { some: { id: session?.user.id } } },
  // });

  // const displayProjects = isAdmin ? projectsNum : `${projectsNum}/${MAX_PROJECTS}`;

  // const isDisabledNewProject = isAdmin ? false : projectsNum === MAX_PROJECTS;

  return (
    <Flex width="100%" direction="column" gap={6}>
      <Flex
        justify="space-between"
        direction="row"
        align="center"
        height="48px"
        width="100%"
        gap={6}
      >
        <Heading as="h1" size="lg">
          {/* Projects ({displayProjects}) */}
          Projects
        </Heading>

        {/* <CreateNewButton isDisabled={isDisabledNewProject} /> */}
        <CreateNewButton />
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
        {/* <Projects limit={9} /> */}
        <Projects />
      </Suspense>
    </Flex>
  );
}
