import React, {useRef} from 'react';
import {useLocation } from 'react-router-dom';
import { debounce } from '~/helpers';
import { history } from '~/history';
import { equals } from 'ramda'
// We need just push, so we can use our file instead of useHistory
import search from '~/static/img/search.png';

export function Search(){
    const location = useLocation(), // location faster than params
          searchInput = useRef(null);
          
    let query = "";
    
    if(~location.pathname.indexOf('/s/')){
        query = location.pathname.slice(3);
    }

    function changeSearch(){
        if(equals(searchInput?.current?.value, "")){
            history.push('/');
            return   
        }
        history.push(`/s/${searchInput?.current?.value || query}`)
    }
    return (
        <div className="search">
            <img
                src={search}
                alt=""
            />
            <input
                type="text"
                ref={searchInput}
                placeholder="Search"
                onKeyDown={debounce(changeSearch, 300)} // To prevent too many rerenders while typing
                defaultValue={query}
            />
        </div>
    )
}