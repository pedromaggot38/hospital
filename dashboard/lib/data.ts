import db from './db.js';

export async function checkRootExists(): Promise<boolean> {
  const rootUser = await db.user.findFirst({
    where: {
      role: 'root',
    },
  });

  return !!rootUser;
}
