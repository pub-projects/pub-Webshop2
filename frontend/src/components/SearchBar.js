import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
    console.log("search bar");
    const [searchWord, setSearchWord] = useState('');
    const navigate = useNavigate();

    const onClickHandler = () => {
        console.log("bar:", searchWord);
        navigate(`/search-page/${searchWord}`);
    }

    return (
        <form className="d-flex mx-2 mb-4 px-5">
            <input className="form-control me-2"
                onChange={e => setSearchWord(e.target.value)}
                value={searchWord}
                type="search"
                placeholder="Search"
                aria-label="Search" />
            <button
                disabled={!searchWord}
                className="btn btn-outline-success"
                type="submit"
                onClick={onClickHandler}
            >Search</button>
        </form>
    )
}