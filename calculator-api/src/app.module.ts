import { Module } from '@nestjs/common';
import { CalculatorModule } from './calculator/calculator.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CalculatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
