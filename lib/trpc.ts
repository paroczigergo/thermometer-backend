import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './context';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
    if (!ctx.session?.user?.email) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }
    return next({
      ctx: {
        // Infers the `session` as non-nullable
        session: ctx.session,
      },
    });
  });
   
  export const middleware = t.middleware;
  export const router = t.router;
   
  /**
   * Unprotected procedure
   **/
  export const publicProcedure = t.procedure;
   
  /**
   * Protected procedure
   **/
  export const protectedProcedure = t.procedure.use(isAuthed);