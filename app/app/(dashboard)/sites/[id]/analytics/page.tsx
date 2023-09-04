import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import AnalyticsMockup from '@/components/analytics';
import { IS_PRODUCTION, NEXT_PUBLIC_ROOT_DOMAIN } from '@/lib/constants';

export default async function SiteAnalytics({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  const site = await prisma.site.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!site || site.userId !== session.user.id) {
    notFound();
  }

  const url = `${IS_PRODUCTION ? 'https' : 'http'}://${
    site.subdomain
  }.${NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
            Analytics for {site.name}
          </h1>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {url} ↗
          </a>
        </div>
      </div>
      <AnalyticsMockup />
    </>
  );
}
