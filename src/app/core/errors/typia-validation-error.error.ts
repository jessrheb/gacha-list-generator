import { IValidation } from 'typia';

export class TypiaValidationError extends Error {
  constructor(public readonly validation: IValidation.IFailure) {
    super('API response validation failed');
    this.name = 'ValidationError';
  }
}
