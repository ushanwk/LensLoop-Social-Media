import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useSignOutAccount} from "@/lib/react-query/queriesandmutations.ts";
import {useEffect} from "react";
import {useUserContext} from "@/context/AuthContext.tsx";

export const LeftSideBar = () => {

    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const { user } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        if(isSuccess){
            navigate(0)
        }
    }, [isSuccess]);

    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to="/" className="flex gap-3 items-center">
                    <h1 className="h1-bold">LensLoop.</h1>
                </Link>

                <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
                    <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="profile" className="h-14 w-14 rounded-full"/>
                    <div className="flex flex-col">
                        <p className="body-bold">{user.name}</p>
                        <p className="small-regular text-light-3">@{user.username}</p>
                    </div>
                </Link>
            </div>
        </nav>
    );
};