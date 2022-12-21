import { useState } from "react";


export const NewMessageForm = ({ onSend }: { onSend: Function }) => {

    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        onSend(inputText);
        setInputText('')
    }

    return <>
        <input
            type="text"
            data-testid="messageText"
            value={inputText}
            onChange={(event) => setInputText(event?.target?.value)}
        />
        <button data-testid='sendButton' onClick={() => handleSend()}>
            Send
        </button>
    </>
}