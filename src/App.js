import './App.css';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Inject,ScheduleComponent, RecurrenceEditorComponent, Day, Week, WorkWeek, Month, Agenda, ICalendarExport, ICalendarImport, EventSettingsModel, Resize, ExcelExport, DragAndDrop, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule'
import Button from './Button';
import { extend, isNullOrUndefined  } from '@syncfusion/ej2-base';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { ChangeEventArgs, DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { MultiSelectComponent  } from '@syncfusion/ej2-react-dropdowns';
import { DataManager, JsonAdaptor, Query, WebApiAdaptor  } from '@syncfusion/ej2-data'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import * as dataSource from './schedule.json';

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.scheduleObj = ScheduleComponent;
    this.multiple = false;
    this.showFileList = false;
    this.allowedExtensions = '.ics';
    this.data = extend([], dataSource.scheduleData, null, true);
    this.Data = [{
      Id: 1,
      Subject: 'Explosion of Betelgeuse Star',
      StartTime: new Date(2021, 10, 18, 9, 30),
      EndTime: new Date(2021, 10, 18, 11, 0)
  },{
      Id: 2,
      Subject: 'Paris',
      StartTime: new Date(2021, 10, 22, 10, 0),
      EndTime: new Date(2021, 10, 22, 12, 30)
    }];
    //this.upState [showUp, setShowUp] = useState(false)
    this.ownerData = [
      { OwnerText: 'Person-1', Id: 1, OwnerColor: '#ffaa00' },
      { OwnerText: 'Person-2', Id: 2, OwnerColor: '#f8a398' },
      { OwnerText: 'Person-3', Id: 3, OwnerColor: '#7499e1' },
      { OwnerText: 'Person-4', Id: 4, OwnerColor: '#459c3a' },
      { OwnerText: 'Person-5', Id: 5, OwnerColor: '#db5ad3' }
    ];
  this.fields = { text: 'OwnerText', value: 'Id' };
}
onPopupOpen(args) {
  if (args.type === 'Editor') {
      let subjectElement = args.element.querySelector('#Summary');
      if (subjectElement) {
          subjectElement.value = (args.data).Subject || "";
      }
      let statusElement = args.element.querySelector('#EventType');
      statusElement.setAttribute('name', 'EventType');
      let descriptionElement = args.element.querySelector('#Description');
      if (descriptionElement) {
          descriptionElement.value = (args.data).Description || "";
      }
  }
}
onPopupClose(args) {
  if (args.type === 'Editor' && !isNullOrUndefined(args.data)) {
      let subjectElement = args.element.querySelector('#Summary');
      if (subjectElement) {
          (args.data).Subject = subjectElement.value;
      }
      let statusElement = args.element.querySelector('#EventType');
      if (statusElement) {
          (args.data).EventType = statusElement.value;
      }
      (args.data).StartTime = this.startObj.value;
      (args.data).EndTime = this.endObj.value;
      let descriptionElement = args.element.querySelector('#Description');
      if (descriptionElement) {
          (args.data).Description = descriptionElement.value;
      }
  }
}
onCreate() {
  console.log('Schedule <b>Create Begin</b> event called<hr>');
}
onActionBegin(args) {
  if (args.requestType === 'toolbarItemRendering') {
    let exportItem = {
        align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icons e-export-excel',
        text: 'Excel Export', cssClass: 'e-excel-export', click: this.onExportClick.bind(this)
    };
    args.items.push(exportItem);
  }
  console.log('Schedule <b>Action Begin</b> event called<hr>');
}
onExportClick() {
  let exportValues = {
      fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'Location']
  };
  this.scheduleObj.exportToExcel(exportValues);
}

onActionComplete(args){
  console.log(args);
  console.log('Schedule <b>Action Complete</b> event called<hr>');
}

onActionFailure() {
  console.log('Schedule <b>Action Failure</b> event called<hr>');
}

onCellDoubleClick() {
  console.log('SChedule <b>Cell Double Click</b> event called<hr>');
}

onCellClick() {
  console.log('Schedule <b>Cell Click</b> event called<hr>');
}

onNavigating() {
  console.log('Schedule <b>Navigating</b> event called<hr>');
}

onDestroyed() {
  console.log('Schedule <b>Destroyed</b> event called<hr>');
}

onEventClick() {
  console.log('Schedule <b>Event Click</b> event called<hr>');
}

onPopupOpen() {
  console.log('Schedule <b>Popup Open</b> event called<hr>');
}
onAddEvent() {
  //this.scheduleObj.addEvent(Data);
}
onGetEvent() {
  this.scheduleObj.getEvents();
}
onSaveEvent() {
  this.scheduleObj.saveEvents(this.scheduleObj.getEvents());
}
onClick() {
    this.scheduleObj.exportToICalendar();
}

onSelect(args) {
    this.scheduleObj.importICalendar(args.event.target.files[0]);
}
change() {
}
editorTemplate(props) {
  return (props !== undefined ? <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}><tbody>
<tr><td className="e-textlabel">Title</td><td colSpan={4}>
  <input id="Summary" className="e-field e-input" type="text" name="Subject" style={{ width: '100%' }}/>
</td></tr>
<tr><td className="e-textlabel">Attendees</td><td colSpan={4}>
  <MultiSelectComponent className="e-field" placeholder='Choose Attendees' data-name="OwnerId" dataSource={this.ownerData} fields={this.fields} value={props.OwnerId}/>
</td></tr>
<tr><td className="e-textlabel">From</td><td colSpan={4}>
  <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="StartTime" data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field"></DateTimePickerComponent>
</td></tr>
<tr><td className="e-textlabel">To</td><td colSpan={4}>
  <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="EndTime" data-name="EndTime" value={new Date(props.endTime || props.EndTime)} className="e-field"></DateTimePickerComponent>
</td></tr>
<tr><td className="e-textlabel">Recurrence</td><td colSpan={4}>
  <RecurrenceEditorComponent ref={recurrObject => this.recurrObject = recurrObject} id='RecurrenceEditor'></RecurrenceEditorComponent>
</td></tr>
<tr><td className="e-textlabel">Description</td><td colSpan={4}>
  <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }}></textarea>
</td></tr></tbody></table> : <div></div>);
}
  render () {
    return (
      <div className='App'>
        <Button id='ics-export' text='Export' onClick={this.onClick.bind(this)}/>
        <Button id='ics-import' text='Import' onAdd={this.onAdd}/>
        <UploaderComponent id='fileUpload' type='file' allowedExtensions={this.allowedExtensions} cssClass='calendar-import' buttons={{ browse: 'Choose file' }} multiple={this.multiple} showFileList={this.showFileList} selected={this.onSelect.bind(this)}></UploaderComponent>
        <ScheduleComponent ref={sched => this.scheduleObj = sched} eventSettings={{ dataSource: this.data }}  startHour='07:30' endHour='21:00'
        created={this.onCreate.bind(this)} actionBegin={this.onActionBegin.bind(this)} actionComplete={this.onActionComplete.bind(this)} 
        actionFailure={this.onActionFailure.bind(this)} cellClick={this.onCellClick.bind(this)} cellDoubleClick={this.onCellDoubleClick.bind(this)} 
        destroyed={this.onDestroyed.bind(this)} navigating={this.onNavigating.bind(this)} eventClick={this.onEventClick.bind(this)} 
        popupOpen={this.onPopupOpen.bind(this)} editorTemplate={this.editorTemplate.bind(this)} quickInfoOnSelectionEnd={true} enablePersistence={true} workHours={{ highlight: false }} 
        addEvent={this.onAddEvent.bind(this)} getEvents={this.onGetEvent.bind(this)} saveEvents={this.onSaveEvent.bind(this)}>
          <ViewsDirective>
                <ViewDirective option='Day'/>
                <ViewDirective option='Week'/>
                <ViewDirective option='WorkWeek'/>
                <ViewDirective option='Month'/>
            </ViewsDirective>    
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, ICalendarExport, ICalendarImport, Resize, DragAndDrop]} />
        </ScheduleComponent>
      </div>
    )
  }
}

export default App;
