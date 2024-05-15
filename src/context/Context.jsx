import React from "react";
import runChat from "../config/gemini";
import showdown from "showdown"

export const Context = React.createContext();

const converter = new showdown.Converter();

const ContextProvider = (props) => {
    // context provier with list of function to be used eveywhere in this project
    const [input, setInput] = React.useState("");
    const [recentPrompt, setRecentPrompt] = React.useState("");
    const [prevPrompts, setPrevPrompts] = React.useState([]);
    const [showResult, setShowResult] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [resultData, setResultData] = React.useState("");
    const delayPara = (index, nextWord) => {
        //adds a dellay while displaying resulted text
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 50 * index)
    }

    const newchat = () => {
        //for resetting result pannel to greeting text
        setLoading(false);
        setShowResult(false);
    }
    const onSent = async (prompt) => {
        /*
        --calls gemini runchat
        --converts markdown to html 
        --saves result with delayPara()
        */
        let requestText = input ? input : prompt;
        setResultData("");
        setLoading(true);
        setShowResult(true);

        if (input) {
            //to avoid adding to search history when recent history are passedS
            setPrevPrompts(prev => [...prev, input]);
        }

        setRecentPrompt(prompt);
        const response = await runChat(requestText);
        let htmlResponse = converter.makeHtml(response);
        let newResponseArray = htmlResponse.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            delayPara(i, newResponseArray[i] + " ");
        }
        setLoading(false);
        setInput("")
    }

    const contextValue = {
        // functions that are globally accessable
        prevPrompts, setPrevPrompts,
        onSent,
        recentPrompt, setRecentPrompt,
        showResult, setShowResult,
        loading, setLoading,
        resultData, setResultData,
        input, setInput,
        newchat

    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
