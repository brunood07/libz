import dayjs from "dayjs";

import { RentsRepositoryInMemory } from "@modules/rents/repository/in-memory/RentsRepositoryInMemory";
import { ListRentsByUserUseCase } from "./ListRentsByUserUseCase";

let rentsRepository: RentsRepositoryInMemory;
let listRentsByUserUseCase: ListRentsByUserUseCase;

describe("List rents by user", () => {
  const add168Hours = dayjs().add(7, "day").toDate();

  beforeEach(() => {
    rentsRepository = new RentsRepositoryInMemory();
    listRentsByUserUseCase = new ListRentsByUserUseCase(rentsRepository);
  });

  it("Should be able to list rents by user", async () => {
    const rent = await rentsRepository.create({
      user_id: "1234",
      book_id: "4321",
      expected_return_date: add168Hours,
    });

    const rents = await listRentsByUserUseCase.execute(rent.user_id);

    expect(rents).toEqual(expect.arrayContaining([rent]));
    expect(rents).toEqual(expect.arrayContaining([expect.objectContaining({ user_id: "1234" })]));
    expect(rents).toEqual(expect.arrayContaining([expect.objectContaining({ book_id: "4321" })]));
  });
});