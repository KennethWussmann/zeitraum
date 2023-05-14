import { randomUUID } from 'crypto';
import { z } from 'zod';

export const applicationName = 'Zeitraum';

const configurationSchema = z.object({
  VERSION: z.string().optional().default('unknown'),
  PORT: z
    .string()
    .optional()
    .default('3000')
    .transform((value) => parseInt(value, 10)),
  HEALTH_PORT: z
    .string()
    .optional()
    .default('9000')
    .transform((value) => (value ? parseInt(value, 10) : undefined)),
  API_TOKENS: z
    .string()
    .optional()
    .default(randomUUID())
    .transform((value) => value.split(',')),
  BASE_URL: z.string().optional(),
  CORS_ENABLE: z
    .string()
    .optional()
    .default('false')
    .transform((value) => value.toLowerCase() === 'true' || value.toLowerCase() === 'yes' || value === '1'),
});

export type Configuration = z.infer<typeof configurationSchema>;

export const loadConfiguration = (): Configuration => {
  const result = configurationSchema.safeParse(process.env);
  if (!result.success) {
    throw new Error(`Failed to load configuration: ${result.error.message}`);
  }
  return result.data;
};
