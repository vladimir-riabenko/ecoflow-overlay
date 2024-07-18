import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import {useEffect, useState} from "react";
import {getEcoflowDeviceList, getEcoflowDeviceQuota} from "../api/ecoflowApi";
import {EcoflowDeviceInfoModel} from "../models/ecoflow";

export function Hello() {
  const [ecoFlow, setEcoFlow] = useState<EcoflowDeviceInfoModel>(new EcoflowDeviceInfoModel());

  useEffect(() => {
    const intervalId = setInterval(() => {
      init()
    }, 1000)

    return () => clearInterval(intervalId);
  }, [])

  function GetWatts(): number {
    return ecoFlow["pd.wattsInSum"] - ecoFlow["pd.wattsOutSum"];
  }

  function init() {
    getEcoflowDeviceList()
      .then((result) => {
        getEcoflowDeviceQuota(result[0].sn).then((ecoflowInfo) => {
          setEcoFlow(ecoflowInfo);
        });
      });
  }

  return (
    <div>
      Temp: {ecoFlow['bmsMaster.temp']} °C
      <br/>

      In/Out: <span className={GetWatts() > 0 ? 'green' : ''}>{GetWatts() > 0 ? '+' : ''}{GetWatts()} W</span>
      <br/>

      Remain: <span className={ecoFlow['bmsMaster.soc'] > 20 ? '' : 'red'}>{ecoFlow['bmsMaster.soc']}% ({ecoFlow['pd.remainTime']} minutes)</span>
      <br/>

      Cycles: {ecoFlow['bmsMaster.cycles']}
      <br/>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
