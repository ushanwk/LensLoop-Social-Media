import {INewUser} from "@/types";
import { ID } from 'appwrite'
import {account, appwriteconfig, avatars, databases} from "@/appwrite/config.ts";

export async function createUserAccount(user:INewUser) {
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            username: user.username,
            imageUrl: avatarUrl,
        });

        return newAccount;
    }catch(error){
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId:string,
    email:string,
    name:string,
    imageUrl:URL,
    username:string
}){
    try{
        const newUser = await databases.createDocument(
            appwriteconfig.databaseId,
            appwriteconfig.userCollectionId,
            ID.unique(),
            user,
        )
        return newUser;
    }catch(error){
        console.log(error);
    }
}