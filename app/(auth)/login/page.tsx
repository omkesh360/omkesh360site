import { Divider, Heading, Stack } from '@/components/chakra';
import { Logo, NextLink } from '@/components/client';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { cookies } from 'next/headers';

import { LoginByEmail, LoginByGithub } from './components';

const hasGithubProvider = !!process.env.GITHUB_ID && !!process.env.GITHUB_SECRET;
const hasEmailProvider = !!process.env.SMTP_USER && !!process.env.SMTP_PASSWORD;

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect('/projects');
  }

  const cookieStore = cookies();
  const requestCookie = cookieStore.get('verificationRequest');
  const isRequested = !!requestCookie && requestCookie.value === 'true';

  return (
    <Stack gap={4} maxWidth="sm" marginX="auto" marginTop="10vh">
      <NextLink href="/">
        <Logo width={256} height={74} />
      </NextLink>

      <Heading as="h1" size="lg">
        Login
      </Heading>

      <Divider />

      {hasEmailProvider && <LoginByEmail isRequested={isRequested} />}

      {hasGithubProvider && (
        <>
          <Divider />
          <LoginByGithub org={process.env.GITHUB_ORG} />
        </>
      )}
    </Stack>
  );
}
