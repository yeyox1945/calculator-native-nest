import { Controller, Get, Query } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { ExpressionValidationPipe } from './pipes/expression-validation.pipe';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get()
  calculate(@Query('expression', ExpressionValidationPipe) expression: string) {
    return this.calculatorService.calculate(expression);
  }
}
