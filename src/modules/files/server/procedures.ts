import { createTRPCRouter, baseProcedure } from '@/trpc/init';

export const fileRouter = createTRPCRouter({
  // Minimal placeholder procedure to satisfy the router import
  ping: baseProcedure.query(() => 'ok'),
});