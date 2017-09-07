export class Employee {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public email: string,
    public phone_number: string,
    public date_birth?: string
  ) {}
}
