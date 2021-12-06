interface ICreateUserDTO {
  full_name: string;
  email: string;
  password: string;
  address: string;
  telephone: string;
  id_number: string;
  id?: string;
}

export { ICreateUserDTO };