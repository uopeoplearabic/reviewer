import { useState } from 'react';
import './App.css';

import data from './review.json';
import icon from './icon.svg';

const ItemCard = ({ item, handlerSelect }) => {
  return <div className="item-card" onClick={() => { handlerSelect(item) }}>
    <img src={icon} alt="Teacher Icon" />
    <div>
      <h4><strong>Instructor:</strong> {item.name}</h4>
      <p><strong>Courses:</strong> {item.courses.length > 0 ?
        item.courses.map((c, i) => {
          return <span key={c + i} className='course-item'>{c}</span>
        })
        : <span className='course-item'>Unknown</span>}</p>
    </div>
  </div>
}

function App() {

  const [val, setVal] = useState("");
  const [filter, setFilter] = useState([]);
  const [item, setItem] = useState(null);

  const handlerChange = (e) => {
    const term = e.target.value;
    setVal(term);
    if (term !== "") {
      setFilter(data.filter(e => e.name.toLowerCase().indexOf(term.toLowerCase()) !== -1).slice(0, 5));
    } else {
      setFilter([]);
    }
  }

  const handlerSelect = (e) => {
    setItem(e);
    setFilter([]);
  }

  return (
    <div className="App">
      <div id="container">
        <h2>ابحث عن اراء الزملاء في الاساتذة</h2>
        <input id="search" type="text" value={val} onChange={(e) => handlerChange(e)} />
        <div id="result">
          {filter.map((e, i) => {
            return <ItemCard key={e.name + i} item={e} handlerSelect={handlerSelect} />
          })}
        </div>
      </div>
      <div id="info">
        {item && <div>
          <img src={icon} alt="Teacher Icon" />
          <h2>{item.name}</h2>
          {item.courses.map((c, i) => {
            return <span key={c + i} className='course-item'>{c}</span>
          })}
          <hr />
          <h3>اراء الزملاء</h3>
          {item.feedbacks.map((e, i) => {
            return <pre key={`rep-${i}`} className='reply'>{e}</pre>
          })}
        </div>}
      </div>
    </div>
  );
}

export default App;
