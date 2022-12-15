import * as trpcNext from '@trpc/server/adapters/next';
import { createContext } from '../../../lib/context';
import { appRouter } from '../../../lib/routers/_app';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext
});