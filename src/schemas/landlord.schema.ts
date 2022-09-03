import Joi from "joi";

export interface LandLordInput {
  first_name: string,
  other_names: string,
  location: string,
  house_name: string,
  description: string,
  imageURL: string,
  public_id: string
}; 

// import { TypeOf, z, object, string, Schema, number } from "zod";
// import { zfd } from "zod-form-data";
// export const schema = zfd.formData({
//   first_name: zfd.text(),
//   other_names: zfd.text(),
//   location: zfd.text(),
//   house_name: zfd.text(),
//   description: zfd.text()
// })


// export const LandLordInput = async({request}: any) => {
//   const {first_name, other_names, location, house_name, description} = schema.parse(
//     await request.formData()
//   );
// };