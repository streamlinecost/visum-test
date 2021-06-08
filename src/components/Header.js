/**
 * Header for Visum Test
 */
import React, { Fragment } from 'react';
import { BryntumFullscreenButton } from '@bryntum/gantt-react';

const Header = (props) => {
    const { href, title } = props;
    return (
        <Fragment>
            <header className="visum-header">
                <div id="title-container">
                    <a id="title" href={href}>
                        {title}
                    </a>
                </div>
                {props.children}
                <BryntumFullscreenButton />
            </header>
        </Fragment>
    );
};

export default Header;