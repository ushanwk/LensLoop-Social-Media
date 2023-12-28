import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SignupValidation } from "@/lib/validation";
import { z } from "zod";
import {Loader} from "@/components/shared/Loader.tsx";
import {Link} from "react-router-dom";
import {createUserAccount} from "@/appwrite/api.ts";

const SignupForm = () => {
    const isLoaded = false;
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      password: "",
      email: "",
      username: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    //Create user
      const newUser = await createUserAccount(values);
      console.log(newUser);
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <h1 className="h1-bold">LensLoop.</h1>
        <h3 className="text-[20px] pt-4">Create a new Account</h3>
        <p className="text-light-3 text-[13px]">
          To use LensLoop, please enter your account details
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Name" type="text" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your Username" type="text" className="shad-input" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

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
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your Password" type="password" className="shad-input" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

          <Button type="submit" className="shad-button_primary mt-4">
              {
                  isLoaded ? (
                   <div className="flex-center gap-2">
                       <Loader/>Loading...
                   </div>
                  ):(
                     "Sign Up"
                  )
              }
          </Button>

            <p className="text-small-regulat text-light-2 text-center mt-2">
                Already have an account?
                <Link to="/sign-in" className="text-primary-500 font-bold ml-1"> Log In</Link>
            </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
