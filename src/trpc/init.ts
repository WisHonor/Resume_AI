import { initTRPC } from '@trpc/server';
import { cache } from 'react';
import superjson from 'superjson';
import { prisma } from '@/lib/db'; // your Prisma client
import { currentUser } from '@clerk/nextjs/server';

export const createTRPCContext = cache(async () => {
  const user = await currentUser();

  return {
    prisma,
    user: user ? { id: user.id, email: user.emailAddresses[0].emailAddress } : null,
  };
});

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

// protectedProcedure will fail if no user in ctx
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new Error("Unauthorized");
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});
