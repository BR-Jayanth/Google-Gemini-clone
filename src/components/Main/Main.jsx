import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import "./main.css"
import { Context } from '../../context/Context'




export default function Main() {
    const suggestionArray = [
        "Suggest beautiful places to see on an upcoming road trip",
        "Briefly summarize this concept: urban planning",
        "Brainstrom team boning activities for our work retreat",
        "Improve the readability of the follwing code"
    ]
    const {
        setPrevPrompts,
        onSent,
        recentPrompt,
        showResult, 
        loading,
        resultData,
        input, setInput
    } = useContext(Context);
    return (
        <div className='main'>
            <div className="nav">
                <p>gemini</p>
                <img src={assets.user_icon} alt="user_icon" />
            </div>
            <div className="main-container">
                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How can I help you today?.</p>
                        </div>
                        <div className="cards">
                            <div className="card"
                                onClick={() => {
                                    //calls a onset(calls gemini) and manually sets previous propmt
                                    setInput(suggestionArray[0]);
                                    setPrevPrompts((prev)=> [...prev,suggestionArray[0]]);
                                    onSent(suggestionArray[0]);
                                }}
                            >
                                <p>{suggestionArray[0]} </p>
                                <img src={assets.compass_icon} alt="compass_icon" />
                            </div>

                            <div className="card"
                                onClick={() => {
                                    setInput(suggestionArray[1]);
                                    setPrevPrompts((prev)=> [...prev,suggestionArray[1]]);
                                    onSent(suggestionArray[1]);
                                }}
                            >
                                <p> {suggestionArray[1]}</p>
                                <img src={assets.bulb_icon} alt="bulb_icon" />
                            </div>

                            <div className="card"
                                onClick={() => {
                                    setInput(suggestionArray[2]);
                                    setPrevPrompts((prev)=> [...prev,suggestionArray[2]]);
                                    onSent(suggestionArray[2]);

                                }}
                            >
                                <p>{suggestionArray[2]} </p>
                                <img src={assets.message_icon} alt="message_icon" />
                            </div>

                            <div className="card"
                                onClick={() => {
                                    setInput(suggestionArray[3]);
                                    setPrevPrompts((prev)=> [...prev,suggestionArray[3]]);
                                    onSent(suggestionArray[3]);
                                }}
                            >
                                <p> {suggestionArray[3]} </p>
                                <img src={assets.code_icon} alt="code_icon" />
                            </div>
                        </div>
                    </>
                    :
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="user_icon" />
                            <p className=''>
                                {recentPrompt}
                            </p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="gemini_icon" />
                            {loading ?
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }

                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => { setInput(e.currentTarget.value) }} value={input} type="text" name="" id="" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="gallery_icon" />
                            <img src={assets.mic_icon} alt="mic_icon" />
                            {
                                input !== "" &&
                                <img
                                    src={assets.send_icon}
                                    alt="send_icon"
                                    onClick={() => {
                                        onSent(input);
                                    }}
                                />
                            }

                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. <a href="https://support.google.com/gemini/answer/13594961?visit_id=638507633436642302-2162194870&p=privacy_notice&rd=1#privacy_notice">Your privacy and Gemini Apps</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
