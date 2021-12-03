interface ICreateBookDTO {
  book_name: string;
  author: string;
  category: string;
  photo_url: string;
  number_of_pages: string;
  id?: string;
}

export { ICreateBookDTO };
