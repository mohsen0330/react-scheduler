import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import { Inject,ScheduleComponent,Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule'


function App() {
  const [sched, setSched] = useState([
    {
      id: 123,
      title: '123',
      dateStart:'123',
      dateEnd:'123',
      attendees:'123',
      description:'123',
      reminder:'true',
    },
    {

    }
  ]
  )
  return (
    <div className='App'>
      <ScheduleComponent>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
    </div>
  )
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