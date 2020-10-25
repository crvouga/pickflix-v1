type ErrorMessage = {
  key: string;
  message: string;
};

export class ErrorList extends Error {
  errors: ErrorMessage[];
  constructor(errors: ErrorMessage[]) {
    super('errors');
    this.errors = errors;
  }
}
