import {
  Controller,
  Get
} from "@nestjs/common";
import { TestingIntegrationService } from "./testing-integration.service";

@Controller('teste')
export class TestingIntegrationController {
  constructor(private readonly testingIntegrationService: TestingIntegrationService) {}

  @Get('dados')
  getDados(): { message: string } {
    return this.testingIntegrationService.getData();
  }
}