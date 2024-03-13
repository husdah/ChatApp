import React, { useState } from 'react'
import Style from './Accordion.module.css';

const data = [
    {
        question: 'Can I use the chat application without installing any software?',
        answer:   'Yes, users can access the chat application through a web browser without requiring additional software or browser extensions. They can simply visit the chat application\'s website and start using it.',
    },
    {
        question: 'What are the system requirements for using the chat application?',
        answer:   'The chat application can be accessed through standard web browsers. Users need to ensure their browsers are compatible and up-to-date. No specific software installations or dependencies are required.',
    },
    {
        question: 'What functionalities does the chat application offer?',
        answer:   'The core functionalities are sending messages, reading messages, creating user accounts, and adding friends within the context of the decentralized chat application.',
    },
    {
        question: 'Do I need to create an account?',
        answer:   'Yes, to utilize the chat application, users need to create an account. This involves setting up a unique identity on the Ethereum blockchain, providing secure access to the chat functionality.',
    },
    {
        question: 'How do I add friends in the chat application?',
        answer:   'Adding friends in the chat application involves sending friend requests. Once the requests are accepted, users can establish connections with their friends and initiate private conversations.',
    },
]

export default function index() {
    const [ selected, setSelected ] = useState(0);

    const toggle = (i) => {
        if(selected === i) {
            return setSelected(null);
        }

        setSelected(i);
    }

    return (
        <div className={Style.accordion}>
            {data.map((item, i) => (
                <div className={Style.accordion_item} key = {i}>
                    <div className={Style.accordion_item_title} onClick={() => toggle(i)}>
                        <h4>{ item.question }</h4>
                        <span>{ selected === i ? '-' : '+' }</span>
                    </div>
                    <div className={ selected === i ? Style.accordion_item_content_show : Style.accordion_item_content }>
                        { item.answer }
                    </div>
                </div>
            ))}
        </div>
    )
}

