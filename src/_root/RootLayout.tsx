import {TopBar} from "@/components/shared/TopBar.tsx";
import {LeftSideBar} from "@/components/shared/LeftSideBar.tsx";
import {Outlet} from "react-router-dom";
import {BottomBar} from "@/components/shared/BottomBar.tsx";

const RootLayout = () => {
    return (
        <div className="w-full md:flex">

            <TopBar />
            <LeftSideBar />

            <section className="flex flex-1 h-full">
                <Outlet />
            </section>

            <BottomBar />

        </div>
    )
}

export default RootLayout