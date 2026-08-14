import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestingIntegrationModule } from '../testing-integration/testing-integration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TestingIntegrationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
