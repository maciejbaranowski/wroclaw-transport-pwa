import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

const BikeNumberBadge = props => {
  let badgeType = "success";
  if (props.number < 3) {
    badgeType = "warning";
  }
  if (props.number === 0) {
    badgeType = "danger";
  }
  return <span class={`badge bg-${badgeType}`}>{props.number}</span>
}
const BikeStationTable = props => {
  if (props.data === null)
    return <div className="spinner-border text-primary"></div>
  return (
      <table className="table table-bordered card-text">
        <thead>
          <tr>
            <th>Stacja</th>
            <th>Ilość rowerów</th>
          </tr>
        </thead>
        <tbody>
        {props.data.map(station => (
          <tr key={station.name}>
            <td>{station.name}</td>
            <td><BikeNumberBadge number={station.numberOfBikes} /></td>
          </tr>        
        ))}
        </tbody>
      </table>);
};

const MpkPolesTables = props => {
  if (props.data === null)
    return <div className="spinner-border text-primary"></div>
  return (<div>{props.data.map(mpkPost => (
    <div><h4>{mpkPost.name}</h4>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Linia</th>
          <th>🕒 Rozkład</th>
          <th>Opóźnienie</th>
          <th>🕒 Realny</th>
          <th>Od teraz</th>
        </tr>
      </thead>
      <tbody>
        {mpkPost.data.map(dataEntry => (
          <tr>
            <td>{dataEntry.line}</td>
            <td>{dataEntry.timetableTime}</td>
            <td>{dataEntry.delay}</td>
            <td>{dataEntry.realTime}</td>
            <td>{dataEntry.realTimeDiff}</td>
          </tr>
        ))}
      </tbody>
    </table></div>
  ))}</div>)
}

const GenericPanel = props => {
  const [data, update_data] = useState(null);
  useEffect(() => {
    Axios.get(`http://localhost:5000/${props.urlResource}`).then((res) => {
      update_data(res.data);
    })
  }, [props.urlResource])
  return (
  <div className="card">
    <div className="card-body">
      <h3 className="card-title">{props.header}</h3>
      <props.tableComponent data={data}/>
    </div>
  </div>);
};

const BikePanel = () => (
  <GenericPanel header="🚴 Rowery" urlResource="bikes" tableComponent={BikeStationTable} />
)

const MpkPanel = () => (
  <GenericPanel header="🚌 MPK" urlResource="mpk" tableComponent={MpkPolesTables} />
)

const App = () => {
  return (
    <div className="App container">
      <div className="row justify-content-center">
        <div className="col-xs-12 col-md-6">
          <BikePanel />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-md-6">
          <MpkPanel />
        </div>
      </div>     
    </div>
  );
}

export default App;
