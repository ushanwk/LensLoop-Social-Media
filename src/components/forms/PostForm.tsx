import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button.tsx"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import {Textarea} from "@/components/ui/textarea.tsx";
import FileUploader from "@/components/shared/FileUploader.tsx";
import {PostValidation} from "@/lib/validation";
import {Models} from "appwrite";
import {useCreatePost} from "@/lib/react-query/queriesandmutations.ts";
import {useUserContext} from "@/context/AuthContext.tsx";
import { useToast} from "@/components/ui/use-toast.ts";
import {useNavigate} from "react-router-dom";


type PostFormProps = {
    post?: Models.Document;
    action: 'create' | 'update';
}

const PostForm = ({ post, action }:PostFormProps) => {

    const {mutateAsync: createPost, isPending:isLoadingCreate} = useCreatePost();

    const {user} = useUserContext();

    const {toast} = useToast();

    const navigate = useNavigate();

    // 1. Define your form.
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post?.location : "",
            tags: post ? post.tags.join(',') : ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidation>) {
        const newPost = await createPost({
            ...values,
            userId: user.id,
        })

        if(!newPost){
            toast({
                title: 'Please try again'
            })
        }

        navigate('/')
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">

                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Caption</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-screollbar" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader fieldChange = {field.onChange} mediaUrl = {post?.imageUrl}/>
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Location</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Tags (Seperated by comma " , ")</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} placeholder="Art, Expression, Learn" />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4 items-center justify-end">

                    <Button type="button" className="shad-button_dark_4">Cancel</Button>

                    <Button type="submit" className="shad-button_primary whitespace-nowrap">Submit</Button>

                </div>

            </form>
        </Form>
    );
};

export default PostForm;