
import { fileRouter } from '@/modules/files/server/procedures';
import {  createTRPCRouter } from '../init';


export const appRouter = createTRPCRouter({
    files: fileRouter,
    
});
// export type definition of API
export type AppRouter = typeof appRouter;