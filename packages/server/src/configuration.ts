import { randomUUID } from 'crypto';
import { z } from 'zod';

const configurationSchema = z.object({
  PORT: z
    .string()
    .default('3000')
    .transform((value) => parseInt(value, 10)),
  API_TOKENS: z
    .string()
    .default(randomUUID())
    .transform((value) => value.split(',')),
});

export type Configuration = z.infer<typeof configurationSchema>;

export const loadConfiguration = (): Configuration => {
  const result = configurationSchema.safeParse(process.env);
  if (!result.success) {
    throw new Error(`Failed to load configuration: ${result.error.message}`);
  }
  return result.data;
};