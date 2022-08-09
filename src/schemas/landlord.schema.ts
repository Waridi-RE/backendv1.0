import { TypeOf, z, object, string, number } from "zod";

export const LandLordInput = object({
  body: object({
    first_name: string({
        required_error: 'Please Enter Your First Name'
      }),
      other_names: string({
        required_error: 'Please Enter Your Middle Name'
      }),
     location: string({
        required_error: 'Please Enter Your Location'
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