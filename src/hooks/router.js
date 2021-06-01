export const useRouter = (router) => {
  router.beforeEach(async (/* to, from */) => {
    return true;
  });
  return router;
};
