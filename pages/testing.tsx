import { useState } from "react";
import { MessageList } from "../components/messaging/message-list";
import { NewMessageForm } from "../components/messaging/new-message-form";



export default function Testing() {
    const [messages, setMessages] = useState<Array<string>>([]);
    const handleSend = (newMessage: string) => {
        setMessages([newMessage, ...messages]);
    }

    return <>
        <NewMessageForm onSend={handleSend} />
        <MessageList list={messages} />
    </>
}
