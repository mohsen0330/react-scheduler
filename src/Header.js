// import PropTypes from 'prop-types'
// import Button from './Button'
// //Add export
// import * as ReactDOM from 'react-dom';
import * as React from 'react';
// import { extend } from '@syncfusion/ej2-base';
// import { ScheduleComponent, ViewDirective, Week, Resize, ExcelExport, DragAndDrop, Inject, ViewsDirective } from '@syncfusion/ej2-react-schedule';

const Header = () => {
    // this is referenced in Button.js click event
    // const onClick = (e) => {
    //     console.log('Click')
       
    // }
    return (
        <header class='header'>
                <h1>React Scheduler</h1>
            {/*
            To Create more buttons copy 
            <Button color='green' text='Export'/> add them below
            */}
           

            {/*
            <button className='btn'>Export</button>
            */}
        </header>
    )
}

export default Header
