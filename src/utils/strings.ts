export class StringsUtils {
  public static emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  public static isValidEmail(value: string): boolean {
    return this.emailRegex.test(value);
  }
}
