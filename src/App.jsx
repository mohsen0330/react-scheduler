import React from 'react'
import * as ReactDOM from 'react-dom';
import { extend } from '@syncfusion/ej2-base';
import { ExcelExport,Inject,ScheduleComponent,Resize, DragAndDrop,Day, Week, WorkWeek, Month, Agenda, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule'
import Header from './Header'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
// import { scheduleData } from './datasource';
import scheduleData from './index.ts'

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.data = extend([], scheduleData, null, true);
    //Enter data using this snippet
    // this.scheduleData = [{
    //         Id: 3,
    //         Subject: 'Testing',
    //         StartTime: new Date(2018, 1, 11, 9, 0),
    //         EndTime: new Date(2018, 1, 11, 10, 0),
    //         IsAllDay: false
    //     }, {
    //         Id: 4,
    //         Subject: 'Vacation',
    //         StartTime: new Date(2018, 1, 13, 9, 0),
    //         EndTime: new Date(2018, 1, 13, 10, 0),
    //         IsAllDay: false
    //     }];
        
      }
      onActionBegin(args) {
        if (args.requestType === 'toolbarItemRendering') {
            let exportItem = {
                align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-excel-export',
                text: 'Excel Export', cssClass: 'e-excel-export', click: this.onExportClick.bind(this)
            };
            args.items.push(exportItem);
        }
    }
    onExportClick() {
        this.scheduleObj.exportToExcel();
    }
  render(){
    return (
          <div className='App'>
            {/* <ButtonComponent id='add' title='Add' ref={t => this.buttonObj = t} onClick={this.onAddClick.bind(this)}>Add</ButtonComponent> */}
            <Header />
            <ScheduleComponent cssClass='excel-export' width='100%' height='550px' id='schedule' ref={t => this.scheduleObj = t} selectedDate={new Date(2021, 9, 20)} eventSettings={{ dataSource: this.data }} actionBegin={this.onActionBegin.bind(this)}>
                  {/*This is for tab view of the calendar */}
                  <ViewsDirective>
                      <ViewDirective option='Day'/>
                      <ViewDirective option='Week'/>
                      <ViewDirective option='WorkWeek'/>
                      <ViewDirective option='Month'/>
                      <ViewDirective option='Agenda'/>
                  </ViewsDirective>
                  <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, ExcelExport]} />
              </ScheduleComponent>
          </div>
    )
  }
}
export default App;

/*
import React from 'react';
import './App.css'


class App extends React.Component {
    public render() {
        return 
    }
}
*/

// function App() {
//   return (
//     <div className='App'>
//       <Header />
//       <ScheduleComponent>
//             <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
//         </ScheduleComponent>
//     </div>
//   )
// }