export class ErrorWithStatus extends Error {
  protected status: number;

  constructor(status?: number) {
    super();
    this.status = status;
  }

  public getStatus(): number {
    return this.status;
  }
}
