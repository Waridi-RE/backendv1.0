import { TypeOf, z, object, string, number } from "zod";

export const LandLordInput = object({
  body: object({
    first_name: string({
        required_error: 'Please Enter Your First Name'
      }),
      other_names: string({
        required_error: 'Please Enter Your Middle Name'
      }),
     id: number({
       required_error: 'Please Enter Your Id'
     }),
     location: string({
        required_error: 'Please Enter Your Location'
      }),
      nationality: string({
        required_error: 'Please Enter Nationality'
      }),
      national_id: number({
        required_error: 'Please Enter National ID'
      }),
      house_name: string({
        required_error: 'Please Enter House Name'
      }),
      description: string({
        required_error: 'Describe Your House'
      })
      


})
})

export type LandLordInput = TypeOf<typeof LandLordInput>['body'];