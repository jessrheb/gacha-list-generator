import { IValidation } from 'typia';

export class TypiaValidationError extends Error {
  override readonly name = 'TypiaValidationError';

  constructor(public readonly validation: IValidation.IFailure) {
    super('API response validation failed');
  }
}
