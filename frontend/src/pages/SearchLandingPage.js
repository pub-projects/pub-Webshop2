import { SearchBar } from '../components/SearchBar';
import { useParams } from 'react-router-dom';
import { SearchList } from "../components/SearchList";

export const SearchLandingPage = () => {

    const { searchTerm } = useParams();
    console.log("Landing:", searchTerm);
    return (
        <div className="">
            <SearchBar />
            <SearchList searchTerm={searchTerm} />
        </div>
    );
}