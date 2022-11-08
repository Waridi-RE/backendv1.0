import  PostgresDataSource  from "../database";
import { ServiceError } from "../classes/ServiceError";
import { User } from "../entities/User";
import { IUser, IUserRecord } from "../interfaces/User";
import bcrypt from 'bcryptjs';
class UserServices {
    constructor(
        private UserRepository = PostgresDataSource.getRepository(User)
    ){ }
    public async createNewUser(user: IUser):
    Promise<Omit<IUserRecord, 'password'> | ServiceError> {
        try {
            const userAlreadyExist = await this.UserRepository.findOne({
                where: {email: user.email}
            });
            if(userAlreadyExist) {
                return new ServiceError('Email is already in use', 400);
            }
            user.password = bcrypt.hashSync(user.password, 10);
            const newUser = await this.UserRepository.save(user);
            newUser.password = undefined;
            return newUser;
        } catch (e) {
            return new ServiceError('Error when trying to create user', 500);
        }
    }

  public async getUserById(id: string): Promise<Omit<IUserRecord, 'password'> | ServiceError> {
   try {
    const user = await this.UserRepository.findOne({
        where: { id }
    });
    if(!user) {
        return new ServiceError("User Doesn't Exist", 422);
    }
    user.password = undefined;
    return user;
   } catch (e) {
     return new ServiceError('Error when trying to get user', 500);
   }
  }

  public async getUserByEmail(email: string): Promise<IUserRecord | ServiceError> {
     try {
        const user = this.UserRepository.findOne({
            where: {email}
        })
        if(!user) {
            return new ServiceError("User Doesn't Exist", 400);
        }
        return user;
     } catch (error) {
        return new ServiceError("Error Getting Email", 500);
     }
  }

  public async getUserByEmailAndPassword(email: string, password: string): Promise<Omit<IUserRecord, 'password'> | ServiceError> {
    try {
        const userResults = await this.getUserByEmail(email)
        if(userResults instanceof Error){
            return userResults;
        }
        const isUserPassword = bcrypt.compareSync(
            password, userResults.password
        );
        if(!isUserPassword) {
            return new ServiceError('Email or Password is Incorrect', 400);
        }
        userResults.password = undefined;
        return userResults;
    } catch (error) {
        return new ServiceError('Error when trying to verify email and password', 500);
    }
  } 

}


export default new UserServices;
