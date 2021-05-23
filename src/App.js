import React, { useEffect, useState } from 'react'
import './App.css';
import Moment from 'moment';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MusicCard from './components/MusicCard';
import MusicCardDetail from './components/MusicCardDetail';
import axios from 'axios';

function App() {
  var today = new Date();
  const date = Moment(today).format('YYYY년MM월DD일 HH:MM')
  const [mode, setMode] = useState('list')
  const [chartType, setchartType] = useState('domestic')
  const [lists, setLists] = useState();
  const [id, setId] = useState();

  const handleChartType = (event, newChartType) => {
    setchartType(newChartType)
  }

  const changeMode = (mode) => {
    setMode(mode)
  }

  const selectId = (id) => {
    setId(id)
  }

  const load = () => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/v1/chart/${chartType}`
        );
        setLists(response.data.chartList);
      } catch (e) {

      }
    };
    fetchLists();
  }

  useEffect(() => {
    load()
  }, []);

  useEffect(() => {
    load()
  }, [chartType]);

  return (
    <div className="app">
      {mode === 'list' ? 
      <div className="appList">
        <div className="title">
          <p>음악 차트</p>
          {date}
        </div>
        <div className="chartType">
          <ToggleButtonGroup value={chartType} size="small" exclusive onChange={handleChartType}>
            <ToggleButton value="domestic">
              국내
            </ToggleButton>
            <ToggleButton value="overseas">
              해외
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="list">
          {lists && lists.map(list => (
            <MusicCard 
              key={list.id} 
              list={list}
              onChangeMode={changeMode}
              onSelectId={selectId}/>
          ))}
        </div>
      </div>
      :
      <MusicCardDetail
        id={id}
        onChangeMode={changeMode}
        />
      }
    </div>
  );
}

export default App;
