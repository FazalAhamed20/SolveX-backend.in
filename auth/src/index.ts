import('tsconfig-paths')
  .then(({ register }) => {
    register({
      baseUrl: '.',
      paths: { '@/*': ['src/*'] },
      addMatchAll: false,
    });
  })
  .then(() => import('@/_boot'))
  .then(({ main }) => main())
  .catch((err) => {
    console.error(err);
  });
