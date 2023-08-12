import { ConfigModule } from '@nestjs/config';

export async function getJWTSecret(): Promise<string | undefined> {
  await ConfigModule.envVariablesLoaded;
  return process.env.JWT_SECRET;
}
