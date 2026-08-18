import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  calculate(expression: string) {
    console.log('Raw expression: ', expression);

    const compute = new Function(`return ${expression}`);

    const result = compute();
    return { result };
  }
}
