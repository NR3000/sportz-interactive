import React from 'react';
import './PlayerCard.css'

const PlayerCard = (props) => {

  let zone = new Date(props.playerData.UpComingMatchesList[0].MDate)
  
  return (
    <div className='player-card'>
      <div className='player-img'><img src={`./player-images/${props.playerData.Id}.jpg`} alt={props.playerData.PDName} /></div>
      <div className='player-details'>
      <p><span>Name: </span>{props.playerData.PFName}</p>
      <p><span>Skills: </span>{props.playerData.SkillDesc}</p>
      <p><span>Value: </span>${props.playerData.Value}</p>
      <p>
        <span>Upcoming Match: </span>
        {
          props.playerData.UpComingMatchesList[0].CCode === "" ?
          "-" 
          : 
          props.playerData.UpComingMatchesList[0].CCode+" vs "+props.playerData.UpComingMatchesList[0].VsCCode
        }
      </p>
      <p>
        <span>Date: </span>
        { 
          props.playerData.UpComingMatchesList[0].MDate === "" ? 
          "-" 
          :
          zone.getDate() + "-" + (zone.getMonth() < 10 ? "0" + (zone.getMonth() + 1) : (zone.getMonth() + 1))+ "-" + zone.getFullYear() + " " + zone.toLocaleTimeString()
        }
      </p>
      </div>
    </div>
  )
}

export default PlayerCard