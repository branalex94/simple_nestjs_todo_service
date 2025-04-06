export class CreateTodoDto {
  public name: string;
  public description: string;
  public isCompleted: boolean = false;
  public userId: number;
}
