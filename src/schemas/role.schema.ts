import { number, object, string} from 'zod';

export const RoleSchema = object({
    body: object({
        name: string ({
            required_error: 'Name is Required'
        })
    })
})