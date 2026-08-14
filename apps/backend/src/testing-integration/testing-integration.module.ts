import { Module } from "@nestjs/common";
import { TestingIntegrationController } from "./testing-integration.controller";
import { TestingIntegrationService } from "./testing-integration.service";

@Module({
  imports: [],
  controllers: [TestingIntegrationController],
  providers: [TestingIntegrationService],
})
export class TestingIntegrationModule {}