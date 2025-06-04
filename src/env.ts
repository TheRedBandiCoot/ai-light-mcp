import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    BASE_URL: z.string().url(),
    DEVICE_ID: z.string().min(1),
    ACCESS_KEY: z.string().min(1),
    SECRET_KEY: z.string().min(1)
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true
});
