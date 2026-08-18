import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ExpressionValidationPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException('Expression parameter is required');
    }

    // Clean the raw formula string, removing all spaces
    const cleanFormula = value.replace(/\s+/g, '');

    // Allow only numbers and basic operators: +, -, *, /, .
    const isValid = /^[0-9+\-*/.()%^√]+$/.test(cleanFormula);

    if (!isValid) {
      throw new BadRequestException('Invalid Expression');
    }

    if (cleanFormula.includes('/0')) {
      throw new BadRequestException('Division by zero is not allowed');
    }

    const sanitized = value
      .replace(/√(\d+(?:\.\d+)?)/g, 'Math.sqrt($1)')
      .replaceAll('^', '**');

    return sanitized;
  }
}
