'use server';

import { generateSecret } from '@/lib/utils';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Site } from '@/types';

export type CreateSiteDto = Pick<Site, 'name' | 'description' | 'slug'>;

export const createSite = async ({ name, description, slug }: CreateSiteDto) => {
  const session = await getSession();

  if (!session?.user.id) {
    throw new Error('Unauthorized');
  }

  try {
    const environmentVariables = {
      production: {
        NEXTAUTH_SECRET: generateSecret(),
        ARGON_SECRET: generateSecret(),
        POSTGRES_PASSWORD: generateSecret(),
      },
      preview: {
        NEXTAUTH_SECRET: generateSecret(),
        ARGON_SECRET: generateSecret(),
        POSTGRES_PASSWORD: generateSecret(),
      },
    };

    const response = await prisma.site.create({
      data: {
        name,
        description,
        slug,
        environmentVariables,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return response;
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('This subdomain is already taken', { cause: error });
    }

    throw error;
  }
};

export type UpdateSiteDto = Partial<Site>;

export const updateSite = async (
  siteId: string,
  { name, description, slug, customDomain, template }: UpdateSiteDto
) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const site = await prisma.site.findUnique({
    where: {
      id: siteId,
    },
  });

  if (!site || site.userId !== session.user.id) {
    throw new Error('You do not have permission to update this site');
  }

  const response = await prisma.site.update({
    where: { id: siteId },
    data: {
      name,
      description,
      slug,
      customDomain: customDomain === '' ? null : customDomain,
      template,
    },
  });

  return response;
};

export const deleteSite = async (site: Site) => {
  try {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: 'Not authenticated',
      };
    }

    const response = await prisma.site.delete({
      where: {
        id: site.id,
      },
    });

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const editUser = async (formData: FormData, _id: unknown, key: string) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: 'Not authenticated',
    };
  }
  const value = formData.get(key) as string;

  try {
    const response = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        [key]: value,
      },
    });
    return response;
  } catch (error: any) {
    if (error.code === 'P2002') {
      return {
        error: `This ${key} is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};
