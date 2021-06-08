/**
 * The App file. It should stay as simple as possible
 */

// Polyfills for Edge <= 18. Remove this line if you don't need support for it.
import 'core-js/stable';

// React libraries
import React, { Fragment } from 'react';

import { BryntumThemeCombo } from '@bryntum/gantt-react'
import Gantt from './components/Gantt';
import Header from './components/Header';

import './App.scss';

const App = props => {
    // Header configuration
    const headerConfig = {
        title: 'Visum Test',
        href: '../../../../../#example-frameworks-react-javascript-advanced'
    };

    return (
        <Fragment>
            <Header {...headerConfig} children={<BryntumThemeCombo />}/>
            <Gantt />
        </Fragment>
    );
};

export default App;
