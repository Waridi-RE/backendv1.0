export interface IApartment {
   apartment_name: string;
   location: string;
   description: string;
   imageURL: string;
   public_id: string;
}

export interface IUApartment extends IApartment {
    id: string
}
