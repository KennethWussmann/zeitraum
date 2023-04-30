import { PrismaClient } from '@prisma/client';

// For now we don't care about multi-user support, but we keep that open for the future.
// So we have one root user that gets everything assigned and has permission to do everything.
export const rootUserId = '29f38bff-cb7b-4137-b08c-793eb5be38ad';

export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  public findById = async (id: string) => this.prisma.user.findUnique({ where: { id } });
  public getRoot = async () => this.findById(rootUserId);
}
