import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    id,
    email,
    telephone,
    address,
    id_number,
    full_name
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      email,
      telephone,
      address,
      id_number,
      full_name
    });

    return user;
  }
}

export { UserMap };