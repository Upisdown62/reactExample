import React from 'react'
import './MusicCard.css';

function MusicCard({list, onChangeMode, onSelectId}){
    const imgUrl = "/img/" + list.imageUrl
    return(
        <div className="card">
            <div className="cardRank">{list.rank}</div>
            <div className="cardImg">
                <img src={imgUrl} alt="img"/>
            </div>
            <div className="cardTitle"
                onClick={() =>{
                onChangeMode('detail')
                onSelectId(list.id)
            }}>
                {list.title}
            </div>
            <div className="cardSinger">{list.singer}</div>
        </div>
    )
}

export default MusicCard;