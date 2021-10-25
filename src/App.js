import './App.css';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {TouchableOpacity} from 'react-native';
//import { Inject, Timezone, ScheduleComponent, RecurrenceEditorComponent, Day, Week, WorkWeek, Month, Agenda, ICalendarExport, ICalendarImport, EventSettingsModel, Resize, ExcelExport, DragAndDrop, ViewsDirective, ViewDirective, ResourceDirective, ResourcesDirective} from '@syncfusion/ej2-react-schedule'
import { Inject, GroupModel, Timezone, ScheduleComponent, RecurrenceEditorComponent, Day, Week, WorkWeek, Month, Agenda, ICalendarExport, ICalendarImport, Resize, ExcelExport, DragAndDrop, ViewsDirective, ViewDirective, ResourceDirective, ResourcesDirective} from '@syncfusion/ej2-react-schedule'
import Button from './Button';
import { extend, isNullOrUndefined  } from '@syncfusion/ej2-base';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
//import { ChangeEventArgs, DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { MultiSelectComponent  } from '@syncfusion/ej2-react-dropdowns';
// import { DataManager, JsonAdaptor, Query, WebApiAdaptor  } from '@syncfusion/ej2-data'
// import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import * as dataSource from './schedule.json';
import Header from './Header'
import User from './user';
import UniqueId from 'react-html-id';
// import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';


export default class App extends React.Component {

  constructor() {
    super(...arguments);
    UniqueId.enableUniqueIds(this);
    this.scheduleObj = ScheduleComponent;
    this.data = extend([], dataSource.scheduleData, null, false);

//   this.CALENDAR_ID = 'a8tdqbnknb1d5792ov1a2393rc@group.calendar.google.com';
//   this.PUBLIC_KEY = 'AIzaSyBn1iAs7ybGnZkMSXJdkg3yhQhPcZpdjOs';

//     var dataManager = new DataManager({
//       url: 'https://www.googleapis.com/calendar/v3/calendars/' + this.CALENDAR_ID + '/events?key=' + this.PUBLIC_KEY,
//       adaptor: new WebApiAdaptor,
//       crossDomain: true
//   });
//   this.scheduleObj.dataBinding = (function (e) {
//     var items = e.result.items;
//     var scheduleData = [];
//     if (items.length > 0) {
//         for (var i = 0; i < items.length; i++) {
//             var event = items[i];
//             var when = event.start.dateTime;
//             var start = event.start.dateTime;
//             var end = event.end.dateTime;
//             if (!when) {
//                 when = event.start.date;
//                 start = event.start.date;
//                 end = event.end.date;
//             }
//             scheduleData.push({
//                 Id: event.id,
//                 Subject: event.summary,
//                 StartTime: new Date(start),
//                 EndTime: new Date(end),
//                 IsAllDay: !event.start.dateTime
//             });
//         }
//     }
//     e.result = scheduleData;
// });
//(this.scheduleObj).append('#Schedule');
    // this.resourceDataSource = {
    //   users: [
    //     {uid:this.nextUniqueId(),Name:'Panel0',Id:0,Color:'#ea7a57'},
    //     {uid:this.nextUniqueId(),Name:'Panel1',Id:1,Color:'#357CD2'},
    //     {uid:this.nextUniqueId(),Name:'Panel2',Id:2,Color:'#7fa900'},
    //     {uid:this.nextUniqueId(),Name:'Panel3',Id:3,Color:'#8000ff'}
    //   ]
      // }
      this.state = {
        users: [
          {Name:'Yumang', id:20, uid:this.nextUniqueId(),color:'#ea7a57'},
          {Name:'Linsangan', id:25, uid:this.nextUniqueId(),color:'#357CD2'},
          {Name:'Caya', id:30, uid:this.nextUniqueId(),color:'#7fa900'},
          {Name:'Padilla', id:35, uid:this.nextUniqueId(),color:'#ff0000'},
          {Name:'Villaverde', id:40, uid:this.nextUniqueId(),color:'#ff00ff'},
          {Name:'Torres', id:45, uid:this.nextUniqueId(),color:'#0000ff'}
        ],
        view: [false]
      }
 
    
    this.multiple = false;
    this.showFileList = false;
    //this.enableAdaptiveUI = false;
    
    this.allowedExtensions = '.ics';
    
    // this.data = extend([], dataSource.scheduleData, null, false);

    this.timezone = new Timezone();

    //this.upState [showUp, setShowUp] = useState(false)
    // this.ownerData = [
    //   { OwnerText: 'Person-1', Id: 1, OwnerColor: '#ffaa00' },
    //   { OwnerText: 'Person-2', Id: 2, OwnerColor: '#f8a398' },
    //   { OwnerText: 'Person-3', Id: 3, OwnerColor: '#7499e1' },
    //   { OwnerText: 'Person-4', Id: 4, OwnerColor: '#459c3a' },
    //   { OwnerText: 'Person-5', Id: 5, OwnerColor: '#db5ad3' }
    // ];
    
  this.groupData = {
    resources:["Resources"],
    allowGroupEdit:true
  };
  //this.fields = { text: "Name", value: "Id", colorField: "Color" };

}//end of constructor


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
  if (args.requestType === 'eventCreate' && args.data.length > 0) {
    let eventData = args.data[0];
    let eventField = this.scheduleObj.eventFields;
    let startDate = eventData[eventField.startTime];
    let endDate = eventData[eventField.endTime];
    //let groupIndex = eventData.ResourceId[0] - 1; 
    // args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate, groupIndex); 
    args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate);
}
  console.log('Schedule <b>Action Begin</b> event called<hr>');
}
onExportClick() {
  let exportValues = {
      fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'Location', 'ResourceId']
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
//Duplicated func
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
// adaptiveView(){
//   if(this.scheduleObj.enableAdaptiveUI=="false"){
//     this.scheduleObj.enableAdaptiveUI="true";
//   } else {
//     this.scheduleObj.enableAdaptiveUI="false";
//   }
//   return this.enableAdaptiveUI
//   console.log('adaptive view');
// }



onSelect(args) {
    this.scheduleObj.importICalendar(args.event.target.files[0]);
    console.log("added")
}

// editorTemplate(props) {
//   return (props !== undefined ? <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}><tbody>
// <tr><td className="e-textlabel">Title</td><td colSpan={4}>
//   <input id="Summary" className="e-field e-input" type="text" name="Subject" style={{ width: '100%' }}/>
// </td></tr>
// {/* <tr><td className="e-textlabel">Attendees</td><td colSpan={4}>
//   <MultiSelectComponent className="e-field" placeholder='Choose Attendees' data-name="OwnerId" dataSource={this.ownerData} fields={this.fields} value={props.OwnerId}/>
// </td></tr> */}
// {/* <tr><td className="e-textlabel">Panels</td><td colSpan={4}>
//   <MultiSelectComponent className="e-field" placeholder='Choose Panels' data-name="Id" dataSource={this.resourceDataSource} fields={this.fields} value={props.Id}/>
// </td></tr> */}
// <tr><td className="e-textlabel">From</td><td colSpan={4}>
//   <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="StartTime" data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field"></DateTimePickerComponent>
// </td></tr>
// <tr><td className="e-textlabel">To</td><td colSpan={4}>
//   <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="EndTime" data-name="EndTime" value={new Date(props.endTime || props.EndTime)} className="e-field"></DateTimePickerComponent>
// </td></tr>
// <tr><td className="e-textlabel">Recurrence</td><td colSpan={4}>
//   <RecurrenceEditorComponent ref={recurrObject => this.recurrObject = recurrObject} id='RecurrenceEditor'></RecurrenceEditorComponent>
// </td></tr>
// <tr><td className="e-textlabel">Description</td><td colSpan={4}>
//   <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }}></textarea>
// </td></tr></tbody></table> : <div></div>);
// }
// addItem = () => {
//   const newItem = {Steve: 'Orange'};
//   this.setState({ ...this.state, newItem });

// };
// changeView(check) {
//   // if(this.enableAdaptiveUI==true){
//   //   this.enableAdaptiveUI=false;
//   // } else{
//   //   this.enableAdaptiveUI=true;
//   // };
//   this.setState(prevState => ({
//     check: !prevState.check
//   }));
//   console.log("button is fired.")
// }

deleteUser = (index, e) => {
  const users = Object.assign([], this.state.users);
  users.splice(index, 1);
  this.setState({users});
  console.log(this.state)
}


changeUserName = (uid, e) => {
  const index = this.state.users.findIndex((user)=>{
    return user.uid === uid;
  });
  const user = Object.assign([], this.state.users[index]);
  user.Name = e.target.value;

  const users = Object.assign([], this.state.users);
  users[index] = user;
  this.setState({users})
}
changeView(){
  let view = Object.assign([], this.state.view);
  if(this.state.view===true){
    view=false;
    this.setState({view});
  } else{
    view=true;
    this.setState({view});
  }
}
  render () {
    return (
      <div className='App'>
        <Header />
        {/*<p>{JSON.stringify(this.resourceDataSource.users, null, 2)}</p>*/}
        <div > {
          this.state.users.map((user, index)=>{
            return(<User 
              id={user.id} 
              key={user.uid}
              color={user.color}
              delEvent={this.deleteUser.bind(this, index)}
              changeEvent={this.changeUserName.bind(this, user.uid)}
              >{user.Name}</User>)  
          })
          
        }
          </div>
         
            <br></br>
            {/*  <button onClick={this.changeView.bind(this, this.check)}>View</button> */}
        <Button color='grey' text='Export' id='ics-export' onClick={this.onClick.bind(this)}/>
        <Button color='grey' text='Change View' onClick={this.changeView.bind(this)}/>
        {/* <Button color='black' text='Import' id='ics-import' onClick={this.onAdd}/> */}
        {/*</div><Button id='view-adaptiv-ui' text="View" adaptiveView={this.adaptiveView.bind(this)}/>*/}
        <UploaderComponent id='fileUpload' type='file' allowedExtensions={this.allowedExtensions} cssClass='calendar-import' buttons={{ browse: 'Choose file' }} multiple={this.multiple} showFileList={this.showFileList} selected={this.onSelect.bind(this)}></UploaderComponent>
        <ScheduleComponent ref={sched => this.scheduleObj = sched}  width='100%' height='1000px' enableAdaptiveUI={this.state.view} eventSettings={{ dataSource: this.data }}  startHour='07:30' endHour='21:00' timezone='UTC+8' group={this.groupData}
         created={this.onCreate.bind(this)} actionBegin={this.onActionBegin.bind(this)} actionComplete={this.onActionComplete.bind(this)} 
         actionFailure={this.onActionFailure.bind(this)} cellClick={this.onCellClick.bind(this)} cellDoubleClick={this.onCellDoubleClick.bind(this)} 
         destroyed={this.onDestroyed.bind(this)} navigating={this.onNavigating.bind(this)} eventClick={this.onEventClick.bind(this)} 
         popupOpen={this.onPopupOpen.bind(this)} quickInfoOnSelectionEnd={true} enablePersistence={true} workHours={{ highlight: false }} 
      >
          <ViewsDirective>
                <ViewDirective option='Day'/>
                <ViewDirective option='Week'/>
                <ViewDirective option='WorkWeek'/>
            </ViewsDirective>  
            <ResourcesDirective>
              <ResourceDirective 
                field="ResourceId" 
                title="Resource Name"
                name="Resources"
                textField="Name"
                idField="id"
                colorField="color"
                dataSource = {this.state.users}
                allowMultiple={true}> 
              </ResourceDirective>
            </ResourcesDirective> 
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, ICalendarExport, ICalendarImport, Resize, DragAndDrop, ExcelExport]} />
        </ScheduleComponent>
      </div>
    )
  }
}


