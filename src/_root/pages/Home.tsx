import {Loader} from "@/components/shared/Loader.tsx";

const Home = () => {

    const isPostLoading = true;
    const post = null;

    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
                    {
                        isPostLoading && !post ?(
                            <Loader />
                        ):(
                            <ul>

                            </ul>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home