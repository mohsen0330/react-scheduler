import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);
let scheduleData: object[] = [{
Id: 1,
Subject: 'Explosion of Betelgeuse Star',
StartTime: new Date(2021, 9, 15, 9, 30),
EndTime: new Date(2021, 9, 15, 11, 0)
}, {
Id: 2,
Subject: 'Thule Air Crash Report',
StartTime: new Date(2021, 9, 12, 12, 0),
EndTime: new Date(2021, 9, 12, 14, 0)
}, {
Id: 3,
Subject: 'Blue Moon Eclipse',
StartTime: new Date(2021, 9, 13, 9, 30),
EndTime: new Date(2021, 9, 13, 11, 0)
}, {
Id: 4,
Subject: 'Meteor Showers in 2018',
StartTime: new Date(2021, 9, 14, 13, 0),
EndTime: new Date(2021, 9, 14, 14, 30)
}];
let scheduleObj: Schedule = new Schedule({
height: '550px',
// selectedDate: new Date(2019, 1, 15),
eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');

export default Schedule

