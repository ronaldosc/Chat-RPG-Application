export class ErrorWithStatus extends Error {
  protected status: number;

  constructor(message?: string, status?: number, options?: ErrorOptions) {
    super(message, options);
    this.status = status;
  }

  public getStatus(): number {
    return this.status;
  }
}
