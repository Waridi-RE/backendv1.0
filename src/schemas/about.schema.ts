import { TypeOf, z, object, string, number } from "zod";

export const aboutUserSchema = object({
    body: object({
        first_name: string({
            required_error: 'Please Enter Your First Name'
          }),
          middle_name: string({
            required_error: 'Please Enter Your Middle Name'
          }),
          last_name: string({
            required_error: 'Please Enter Your Last Name'
          }),
        id: number({
           required_error: 'Please Enter Your Id'
         }),
         location: string({
            required_error: 'Please Enter Your Location'
          }),
          gender: string({
            required_error: 'Please Enter Your Gender'
          }),
          marital_status: string({
            required_error: 'Please Enter Your Id'
          })

    })
}) 


export const landlordSchema = object({
  body: object({
    first_name: string({
        required_error: 'Please Enter Your First Name'
      }),
      middle_name: string({
        required_error: 'Please Enter Your Middle Name'
      }),
      last_name: string({
        required_error: 'Please Enter Your Last Name'
      }),
    id: number({
       required_error: 'Please Enter Your Id'
     }),
     location: string({
        required_error: 'Please Enter Your Location'
      }),
      gender: string({
        required_error: 'Please Enter Your Gender'
      }),
      marital_status: string({
        required_error: 'Please Enter Your Id'
      })

})
})

export type AboutUserSchema = TypeOf<typeof aboutUserSchema>['body'];