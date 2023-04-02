import { useState, useRef, useEffect } from 'react';
import './App.css';
import PlayerCard from './PlayerCard';

import Axois from 'axios';

let backupResult = []

function App() {

  const [result, setResult] = useState([])
  const search = useRef(null)

  const handleSearch = () => {
    try {
      let pattern = new RegExp(search.current.value, 'i')
      let newResult = []
      backupResult.forEach(
        ele => {
          if (pattern.test(ele.PFName) || pattern.test(ele.TName)) {
            newResult.push(ele)
          }
        }
      )
      newResult = newResult.sort((a, b) => a.Value - b.Value)
      setResult(newResult)
    }
    catch (e) {
      console.log(e.message)
      setResult([])
    }
  }

  useEffect(
    () => {
      Axois.get("https://api.npoint.io/20c1afef1661881ddc9c").then(
        (res) => {
          console.log("Page is loaded.")
          let sortedResult = res.data.playerList.sort((a, b) => a.Value - b.Value)
          backupResult = sortedResult
          console.log(backupResult)
          setResult(sortedResult)
        }
      ).catch(
        (err) => { console.log(err) }
      )
    }
    , [])

  return (
    <div className="App">
      <div className='player-search'>
        <input type='search' className='search' onChange={() => handleSearch()} placeholder='Search your player...' ref={search} />
      </div>

      {
        result.length === 0 ?
          <div className='alert-msg'>No result found</div>
          :
          <div className='player-result'>
            {result.map(
            (playerData, index) => <PlayerCard playerData={playerData} key={index} />
            )}
          </div>
      }
    </div>
  );
}

export default App;
