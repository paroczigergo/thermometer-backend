import { useState } from "react";


export const MessageList = ({ list }: { list: Array<string> }) => {

    return <ul>
        {list.map(message => <li key={message}>{message}</li>)}
    </ul>
}