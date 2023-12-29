import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {useSignOutAccount} from "@/lib/react-query/queriesandmutations.ts";
import {useEffect} from "react";
import {useUserContext} from "@/context/AuthContext.tsx";
import {sidebarLinks} from "@/constants";
import {INavLink} from "@/types";
import {Button} from "@/components/ui/button.tsx";

export const LeftSideBar = () => {

    const { pathname} = useLocation();
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

                <ul className="flex flex-col gap-6">
                    {
                        sidebarLinks.map((link: INavLink) => {

                            const isActive = pathname == link.route;

                            return(
                                <li key={link.route} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>

                                    <NavLink to={link.route} className="flex gap-4 items-center p-4">
                                        <img src={link.imgURL} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                                        {link.label}
                                    </NavLink>
                                </li>
                            )

                        })
                    }
                </ul>
            </div>

            <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
                <img src="/assets/icons/logout.svg" />
                <p className="small-medium lg:base-medium">Logout</p>
            </Button>

        </nav>
    );
};