import PostForm from "@/components/forms/PostForm.tsx";
import {useParams} from "react-router-dom";
import {useGetPostById} from "@/lib/react-query/queriesandmutations.ts";
import {Loader} from "@/components/shared/Loader.tsx";


const EditPost = () => {

    const {id} = useParams();
    const {data:post, isPending} = useGetPostById(id || '');

    if(isPending) return <Loader />

    return (

        <div className="flex flex-1">
            <div className="common-container">
                <div className="max-2-5xl flex-start gap-3 justify-start w-full">
                    <img src="/assets/icons/add-post.svg" width={36} height={36} alt="add" />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
                </div>

                <PostForm action="update" post={post} />
            </div>
        </div>

    );
};

export default EditPost