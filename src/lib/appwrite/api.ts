import {INewUser} from "@/types";
import {ID, Query} from 'appwrite'
import {account, appwriteconfig, avatars, databases} from "@/lib/appwrite/config.ts";

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

        console.log(newUser);

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

export async function signInAccount(user:{ email:string; password:string;}){
    try{
        const session = await account.createEmailSession(user.email, user.password);
        return session;
    }catch(error){
        console.log(error)
    }
}

export async function getCurrentUser(){
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteconfig.databaseId,
            appwriteconfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0]
    }catch (error){
        console.log(error)
        return
    }
}

export async function signOutAccount(){
    try {
        const session = await account.deleteSession("current");
        return session;
    }catch(error){
        console.log(error)
    }
}