import {Loader} from "@/components/shared/Loader.tsx";

type SearchResultProps = {
    isSearchFetching: boolean;
    searchPosts: Models.Document[];
}

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {

    if(isSearchFetching){
        return <Loader/>
    }



    return (
        <></>
    );
};

export default SearchResults