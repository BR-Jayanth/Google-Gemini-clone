import React from 'react'
import "./sidebar.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';

export default function Sidebar() {

    const [extended, setExtended] = React.useState(false);
    const {
        prevPrompts, 
        onSent,
        setRecentPrompt,
        newchat

    } = React.useContext(Context);



    const loadPrompt = async(prompt) => {
        //calls onset(gemini ) with specific recent search value
        setRecentPrompt(prompt);
         await onSent(prompt);
    }
    return (
        <div className='sidebar'>
            <div className="top">
                <img className='menu' src={assets.menu_icon} alt="menu icon"
                    onClick={() => setExtended((prevState) => !prevState)}
                />
                <div className="new-chat"
                 onClick={newchat}
                >
                    <img src={assets.plus_icon} alt="plus-icon" />
                    {extended && <p>New Chat</p>}
                </div>
                {
                    extended &&
                    <div className="recent">
                        <p className="recent-title">
                            Recent
                        </p>
                        {prevPrompts &&
                            prevPrompts.map((prompts, index) => {
                                return (
                                    <div className="recent-entry"
                                        key={index}
                                        onClick={()=> loadPrompt(prompts)}
                                    >
                                        <img src={assets.message_icon} alt="message icon" />
                                        <p>{prompts.slice(0, 18) + "...."}</p>
                                    </div>
                                )

                            })
                        }
                    </div>
                }

            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="question icon" />
                    {extended && <p>Help</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="history_icon" />
                    {extended && <p>Activity</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="setting_icon" />
                    {extended && <p>New Chat</p>}
                </div>
            </div>
        </div>
    )
}
