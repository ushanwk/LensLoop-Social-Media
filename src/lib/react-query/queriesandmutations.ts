import{
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
}from '@tanstack/react-query'
import {createUserAccount, signInAccount} from "@/lib/appwrite/api.ts";
import {INewUser} from "@/types";

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: async (user: INewUser) => {
            createUserAccount(user);
        },
    });
};

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: async (user: { email:string; password:string; }) => {
            signInAccount(user);
        },
    });
};