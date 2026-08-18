import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculate', () => {
    it('should add two numbers', () => {
      const response = service.calculate('2+3');
      expect(response).toEqual({ result: 5 });
    });

    it('should subtract two numbers', () => {
      const response = service.calculate('10-4');
      expect(response).toEqual({ result: 6 });
    });

    it('should multiply two numbers', () => {
      const response = service.calculate('6*7');
      expect(response).toEqual({ result: 42 });
    });

    it('should divide two numbers', () => {
      const response = service.calculate('20/4');
      expect(response).toEqual({ result: 5 });
    });

    it('should respect operator precedence', () => {
      const response = service.calculate('2+3*4');
      expect(response).toEqual({ result: 14 });
    });

    it('should evaluate expressions with parentheses correctly', () => {
      const response = service.calculate('(2+3)*4');
      expect(response).toEqual({ result: 20 });
    });

    it('should handle decimal / floating-point calculations', () => {
      const response = service.calculate('2.5*2');
      expect(response).toEqual({ result: 5 });
    });

    it('should evaluate exponentiation expressions', () => {
      const response = service.calculate('2**3');
      expect(response).toEqual({ result: 8 });
    });

    it('should evaluate Math.sqrt expressions', () => {
      const response = service.calculate('Math.sqrt(16)');
      expect(response).toEqual({ result: 4 });
    });

    it('should handle negative numbers and unary operators', () => {
      const response = service.calculate('-5+10');
      expect(response).toEqual({ result: 5 });
    });

    it('should handle modulo operations', () => {
      const response = service.calculate('10%3');
      expect(response).toEqual({ result: 1 });
    });

    it('should evaluate complex combined mathematical expressions', () => {
      const response = service.calculate('(10+2)*(5-3)/4');
      expect(response).toEqual({ result: 6 });
    });
  });
});
