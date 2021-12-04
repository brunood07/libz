interface ICreateBookDTO {
  book_name: string;
  author: string;
  category: string;
  photo_url: string;
  number_of_pages: string;
  publishing_company: string;
  isbn: string;
  release_year: number;
  id?: string;
}

export { ICreateBookDTO };
