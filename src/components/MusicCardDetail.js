import { AiOutlineArrowLeft } from "react-icons/ai"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './MusicCardDetail.css';

function MusicCardDetail({id, onChangeMode}){
    console.log('Detail Key => ', id)
    const [detail, setDetail] = useState();

    useEffect(() => {
        load()
    }, [])

    const load = () => {
        const fetchLists = async () => {
            try {
              const response = await axios.get(
                `http://localhost:3300/v1/chart/detail/${id}`
              );
              setDetail(response.data.chart);
            } catch (e) {
      
            }
        };
        fetchLists();
    }

    return(
        <div className="detail">
            <div className="detailArrow">
                <AiOutlineArrowLeft
                    onClick={() => {
                        onChangeMode('list')
                    }}>
                </AiOutlineArrowLeft>
            </div>
            <div className="detailHeader">
                <div className="detailTitle">
                    <h1>{detail && detail.title}</h1>
                    <p>{detail && detail.singer}</p>
                </div>
            </div>
            <div className="detailContent">
                <div>
                    <div className="detailLyricist">작사</div>
                    <div className="lyricistData">{detail && detail.lyricist}</div>
                </div>
                <div>
                    <div className="detailMelodizer">작곡</div>
                    <div className="melodizerData">{detail && detail.melodizer}</div>
                </div>
                <div>
                    <div className="detailGenre">장르</div>
                    <div className="genreData">{detail && detail.genre}</div>
                </div>
            </div>
        </div>
    )
}

export default MusicCardDetail;

/*
genre: "댄스"
id: 1
lyricist: "아이유"
melodizer: "Ryan S.Jhun, Jeppe London Bilsby, Lauritz Emil Christiansen, 아이유(IU), Chloe Latimer, Celine Svanback"
singer: "아이유"
title: "Celebrity"
*/