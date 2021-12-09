interface ICreateRentDTO {
  user_id: string;
  book_id: string;
  expected_return_date: Date;
  id?: string;
  end_date?: Date;
  total?: number;
  start_date?: Date;
}

export { ICreateRentDTO };