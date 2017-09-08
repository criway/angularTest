export class Employee {
  public data;

  constructor(public id: number,
              private first_name: string,
              private last_name: string,
              private email: string,
              private phone_number: string,
              private date_birth?: string) {
    this.data = {
      id: id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      date_birth: date_birth
    };
  }
}
