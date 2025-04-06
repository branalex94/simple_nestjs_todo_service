export class StringsUtils {
  public static isValidEmail(value: string): boolean {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(value);
  }
}
