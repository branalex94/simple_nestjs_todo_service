export class TodoDto {
  public id: number;
  public name: string;
  public description: string;
  public isCompleted: boolean;
  public createdAt: Date | string;
  public updatedAt: Date | string;
  public userId: number;

  constructor(
    id: number,
    name: string,
    description: string,
    isCompleted: boolean,
    createdAt: Date | string,
    updatedAt: Date | string,
    userId: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isCompleted = isCompleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userId = userId;
  }
}
