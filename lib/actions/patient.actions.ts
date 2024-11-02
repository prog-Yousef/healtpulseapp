import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"
import { log } from "console"
import { parseStringify } from "../utils"

export const createUser = async (user: CreateUserParams) => {


try {
    const newUser = await users.create(
        ID.unique(),
        user.email,
        user.phone,
        undefined,
        user.name,    
    )
    console.log({newUser});
    return parseStringify(newUser);
    
    
} catch (error:any) {
    //409 user exists
    //Query from node-appwrite
    //filtering and finding the user
    if(error && error?.code === 409 ) {
       const documents = await users.list([
        Query.equal("email", user.email)
       ])

       return documents?.users[0]
    }
   }
}