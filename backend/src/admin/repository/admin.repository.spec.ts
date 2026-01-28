import { PrismaService } from 'src/common/prisma/prisma.service';
import { AdminRepository } from './admin.repository';

describe('Repository', () => {
  const prisma = new PrismaService()
  it('should be defined', () => {
    expect(new AdminRepository(prisma)).toBeDefined();
  });
});
