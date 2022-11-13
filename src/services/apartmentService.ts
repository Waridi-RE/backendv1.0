import { Apartment } from "../entities/Apartment";
import { IApartment, IUApartment } from "../interfaces/Apartment";
import { ServiceError } from "../classes/ServiceError";
import PostgresDataSource from "../database";

class ApartmentService{
  constructor(private ApartmentRepository = PostgresDataSource.getRepository(Apartment))
 { }


public async createNewApartment(apartment: IApartment) {
      try {
        const apartmentExists = this.ApartmentRepository.findOne({
            where: {apartment_name: apartment.apartment_name}
        })

        if(apartmentExists){
            return new ServiceError('Apartment Already Exists', 400);
        }
        const newApartment = this.ApartmentRepository.save(apartment);
        return newApartment;
      } catch (error) {
        return new ServiceError('Error when trying to create apartment', 500);
      }
    }
}
