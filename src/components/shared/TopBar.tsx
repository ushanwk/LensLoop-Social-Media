import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useSignOutAccount} from "@/lib/react-query/queriesandmutations.ts";
import {useEffect} from "react";
import {useUserContext} from "@/context/AuthContext.tsx";

export const TopBar = () => {

    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const { user } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        if(isSuccess){
            navigate(0)
        }
    }, [isSuccess]);

    return (
        <section className="topbar">
            <div className="flex-between py-4 px-5">

                <Link to="/" className="flex gap-3 items-center">
                    <h1 className="h2-bold">LensLoop.</h1>
                </Link>

                <div className="flex gap-4">
                    <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
                        <img src="/assets/icons/logout.svg" />
                    </Button>
                    <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                        <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} className='h-8 w-8 rounded-full'/>
                    </Link>
                </div>

            </div>
        </section>
    );
};