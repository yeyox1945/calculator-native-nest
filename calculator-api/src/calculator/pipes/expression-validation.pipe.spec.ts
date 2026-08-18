import { BadRequestException } from '@nestjs/common';
import { ExpressionValidationPipe } from './expression-validation.pipe';

describe('ExpressionValidationPipe', () => {
  let pipe: ExpressionValidationPipe;

  beforeEach(() => {
    pipe = new ExpressionValidationPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should throw BadRequestException if value is empty or not a string', () => {
    expect(() => pipe.transform('')).toThrow(
      new BadRequestException('Expression parameter is required'),
    );
    expect(() => pipe.transform(null as unknown as string)).toThrow(
      new BadRequestException('Expression parameter is required'),
    );
  });

  it('should throw BadRequestException for invalid characters', () => {
    expect(() => pipe.transform('2+foo')).toThrow(
      new BadRequestException('Invalid Expression'),
    );
    expect(() => pipe.transform('alert(1)')).toThrow(
      new BadRequestException('Invalid Expression'),
    );
  });

  it('should throw BadRequestException on division by zero', () => {
    expect(() => pipe.transform('10/0')).toThrow(
      new BadRequestException('Division by zero is not allowed'),
    );
    expect(() => pipe.transform('10 / 0')).toThrow(
      new BadRequestException('Division by zero is not allowed'),
    );
  });

  it('should transform square root symbol to Math.sqrt', () => {
    expect(pipe.transform('√16')).toBe('Math.sqrt(16)');
    expect(pipe.transform('√25+5')).toBe('Math.sqrt(25)+5');
  });

  it('should transform exponentiation ^ to **', () => {
    expect(pipe.transform('2^3')).toBe('2**3');
  });

  it('should return valid arithmetic expressions as is', () => {
    expect(pipe.transform('2+3*4')).toBe('2+3*4');
  });
});
