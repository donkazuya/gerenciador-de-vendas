import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { execSync } from 'child_process';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const dbUrl = process.env['DATABASE_URL'] || 'file:./dev.db';
    const adapter = new PrismaBetterSqlite3({
      url: dbUrl,
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    await this.ensureDatabaseSchema();
  }

  private async ensureDatabaseSchema() {
    try {
      const tables: Array<{ name: string }> = await this.$queryRaw`
        SELECT name FROM sqlite_master WHERE type='table' AND name='User';
      `;

      if (tables.length === 0) {
        this.logger.log('Tabelas do banco de dados SQLite não encontradas. Sincronizando schema...');
        try {
          execSync('npx prisma db push --accept-data-loss', {
            stdio: 'inherit',
            env: process.env,
          });
          this.logger.log('Schema do banco de dados SQLite sincronizado com sucesso.');
        } catch (err) {
          this.logger.error('Erro ao sincronizar schema do banco SQLite via CLI:', err);
        }
      }
    } catch (error) {
      this.logger.warn('Aviso durante a verificação de tabelas do SQLite:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}