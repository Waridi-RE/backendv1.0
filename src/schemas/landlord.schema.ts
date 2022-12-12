import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {type: String, unique: true, required: true},
  user_name: {type: String, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, required: true},
  createdDate: {type: Date, default: Date.now}
});

export default mongoose.model('User', UserSchema);

// import { TypeOf, z, object, string, Schema, number } from "zod";
// import { zfd } from "zod-form-data";
// export const schema = object({
//   first_name: string({
//     required_error: 'First Name is Required',
//   }),
//   other_names: string({
//     required_error: 'Other Names '
//   }),
//   location: string({
//     required_error: 'Location is Required',
//   }),
//   house_name: string({
//     required_error: 'House Name is Required',
//   }),
//   description: string({
//     required_error: 'Description is Required',
//   })
// })


// export const LandLordInput = async({request}: any) => {
//   const {first_name, other_names, location, house_name, description} = schema.parse(
//     await request.formData()
//   );
// };