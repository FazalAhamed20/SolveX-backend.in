import { Application } from 'express';

export default async (app: Application) => {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`⚡ Server is listening at ${PORT}`);
  });
};
