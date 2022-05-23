export class Flight {
  constructor(
    public id,
    public name,
    public fromCity,
    public toCity,
    public date,
    public time,
    public services: string[] = []) {
  }
}
