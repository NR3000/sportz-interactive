import { useState, useRef, useEffect } from 'react';
import './App.css';
import PlayerCard from './PlayerCard';

import Axois from 'axios';

function App() {

  const [result, setResult] = useState([])
  const search = useRef(null)

  const handleSearch = () => {
    let pattern = new RegExp(search.current.value, 'i')
    console.log(pattern)
    let newResult = []
    Data.playerList.forEach(
      ele => {
        if (pattern.test(ele.PFName) || pattern.test(ele.TName)) {
          newResult.push(ele)
        }
      }
    )
    newResult = newResult.sort((a, b) => a.Value - b.Value)
    setResult(newResult)
  }

  useEffect(
    () => {
      Axois.get("https://api.npoint.io/20c1afef1661881ddc9c").then(
        (res) => {
          console.log("Page is loaded.")
          let sortedResult = res.data.playerList.sort((a, b) => a.Value - b.Value)
          setResult(sortedResult)
        }
      ).catch(
        (err)=> {console.log(err)}
      )
    }
    , [])

  return (
    <div className="App">
      <div className='player-search'>
        <input type='text' className='search' onChange={() => handleSearch()} placeholder='Search your player...' ref={search} />
      </div>
      <div className='player-result'>
        {
          result.map(
            (playerData, index) => <PlayerCard playerData={playerData} key={index} />
          )
        }
      </div>
    </div>
  );
}

export default App;
