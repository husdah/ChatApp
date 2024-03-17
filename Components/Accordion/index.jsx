import React, { useState, useEffect } from 'react';
import Style from './Accordion.module.css';
import { useTranslation } from 'react-i18next';
import { FaPlus, FaMinus } from 'react-icons/fa';

const data = [
    {
        question: 'faq.question1',
        answer:   'faq.answer1',
    },
    {
        question: 'faq.question2',
        answer:   'faq.answer2',
    },
    {
        question: 'faq.question3',
        answer:   'faq.answer3',
    },
    {
        question: 'faq.question4',
        answer:   'faq.answer4',
    },
    {
        question: 'faq.question5',
        answer:   'faq.answer5',
    }
];

export default function FAQ() {
    const { t, i18n } = useTranslation();
    const [selected, setSelected] = useState(null);

    const toggle = (i) => {
        setSelected(selected === i ? null : i);
    };

    useEffect(() => {
        const storedLanguage = localStorage.getItem('selectedLanguage');
        if (storedLanguage) {
          i18n.changeLanguage(storedLanguage);
        }
      }, []);

    return (
        <div className={Style.accordion}>
            {data.map((item, i) => (
                <div className={Style.accordion_item} key={i}>
                    <div className={Style.accordion_item_title} onClick={() => toggle(i)}>
                        <h4>{t(item.question)}</h4>
                        <span>{selected === i ? <FaMinus /> : <FaPlus />}</span>
                    </div>
                    <div className={selected === i ? Style.accordion_item_content_show : Style.accordion_item_content}>
                        {t(item.answer)}
                    </div>
                </div>
            ))}
        </div>
    );
}

