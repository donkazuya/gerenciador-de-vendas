import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TestingIntegrationService {
  constructor(private readonly prisma: PrismaService) {}

  async getData() {
    return {
      message: "Testando integração back/front",
      database: "SQLite (Prisma ORM)",
    };
  }
}