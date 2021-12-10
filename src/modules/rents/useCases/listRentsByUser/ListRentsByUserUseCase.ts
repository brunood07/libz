import { inject, injectable } from "tsyringe";

import { Rent } from "@modules/rents/infra/typeorm/entities/Rent";
import { IRentsRepository } from "@modules/rents/repository/IRentsRepository";

@injectable()
class ListRentsByUserUseCase {
  constructor(
    @inject("RentsRepository")
    private rentsRepository: IRentsRepository
  ) { }

  async execute(user_id: string): Promise<Rent[]> {
    const rentsByUser = await this.rentsRepository.findByUser(user_id);

    return rentsByUser;
  }
}

export { ListRentsByUserUseCase };