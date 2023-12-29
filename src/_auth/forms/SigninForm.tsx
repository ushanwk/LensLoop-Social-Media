import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {SigninValidation} from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import {Loader} from "@/components/shared/Loader.tsx";
import {useSignInAccount} from "@/lib/react-query/queriesandmutations.ts";



const SigninForm = () => {

    const { toast } = useToast();

    const { checkAuthUser, isLoading: isUserLoading} = useUserContext();

    const navigate = useNavigate();

    const { mutateAsync: signInAccount } = useSignInAccount();

    // 1. Define your form.
    const form = useForm<z.infer<typeof SigninValidation>>({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
            password: "",
            email: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SigninValidation>) {

        const session = await signInAccount({
            email: values.email,
            password: values.password,
        });

        if (!session) {
            return toast({
                title: "Sign In failed. Please try again.",
            });
        }

        const isLoggedIn = await checkAuthUser();

        if(isLoggedIn){
            form.reset();
            navigate('/')
        }else{
            return toast({
                title: "Sign Up failed. Please try again.",
            });
        }
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <h1 className="h1-bold">LensLoop.</h1>
                <h3 className="text-[20px] pt-4">Log in to Your Account</h3>
                <p className="text-light-3 text-[13px]">
                    Welcome back, Please enter yout details
                </p>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your Email" type="email" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your Password" type="password" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="shad-button_primary mt-4">
                        {
                            isUserLoading ? (
                                <div className="flex-center gap-2">
                                    <Loader/>Loading...
                                </div>
                            ):(
                                "Sign In"
                            )
                        }
                    </Button>

                    <p className="text-small-regulat text-light-2 text-center mt-2">
                        Don't have an Account?
                        <Link to="/sign-up" className="text-primary-500 font-bold ml-1">Sign Up</Link>
                    </p>
                </form>
            </div>
        </Form>
    );
};

export default SigninForm;
