import server from '@/_boot/server';
import app from '@/presentation/application';
import database from '@/_boot/database';

export const main = async () => {
  try {
    await server(app);

    await database();
  } catch (error: any) {
    console.log(`Oops!`, error?.message);
  }
};
