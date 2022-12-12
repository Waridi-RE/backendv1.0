import { omit } from "lodash";
import config from 'config';
import apartmentModel, {Apartment} from "../models/apartment.model";
import { signJwt } from "../utils/jwt";

import redisClient from "../utils/connectRedis";

export const createApartment = async (input: Partial<Apartment>) => {
  const apartment = await apartmentModel.create(input);
  return omit(apartment.toJSON());
}

export const findAllApartments = async () => {
  return await apartmentModel.find();
}
