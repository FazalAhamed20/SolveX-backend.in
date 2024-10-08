import('tsconfig-paths')
  .then(({ register }) => {
    register({
      baseUrl: __dirname,
      paths: { '@/*': ['*'] },
      addMatchAll: false,
    });
  })
  .then(() => import('@/_boot'))
  .then(({ main }) => main())
  .catch((err) => {
    console.error(err);
  });
