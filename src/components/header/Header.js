import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search } from './Search';
import { config } from '~/config';
import "./css/header.scss";

function HeaderTemplate(){
    return (
        <header>
            <nav className="pages_nav">
                <ul className="pages_nav__list">
                    {config.pages.map(({link, label}) => (
                        <li key={link}> {/* They are constant, but it will be better to have the key prop */}
                            <NavLink
                                to={link}
                                exact
                                className="header__pages"
                                activeClassName="active_page" /* I don't need to check if it is active */
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav> {/* We have no reason to make unstate function */}
            <Search />
        </header>
    )
}

export const Header = React.memo(HeaderTemplate);
