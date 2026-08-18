import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';

describe('CalculatorController', () => {
  let controller: CalculatorController;
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [CalculatorService],
    }).compile();

    controller = module.get<CalculatorController>(CalculatorController);
    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('calculate', () => {
    it('should delegate calculation to CalculatorService and return the result', () => {
      const expression = '2+2';
      const expectedResult = { result: 4 };

      const spy = jest.spyOn(service, 'calculate').mockReturnValue(expectedResult);

      const result = controller.calculate(expression);

      expect(spy).toHaveBeenCalledWith(expression);
      expect(result).toEqual(expectedResult);
    });

    it('should return correct calculation result using real service execution', () => {
      const result = controller.calculate('5*4');
      expect(result).toEqual({ result: 20 });
    });
  });
});
