import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import feedbackImg from '../../Assets/feedbackImg.svg';
import closeImg from '../../Assets/close.svg';

// export default function Feedback = (props) => {

//   const { feedbackList, position } = props;

//   const [list, setList] = useState(feedbackList);
//   const [text, setText] = useState("Texto do feedback")

//   useEffect(() => {
//     setList(feedbackList);
//   }, [feedbackList, list]);

//   return (
//     <div className="feedback-container">
//       <img src={feedbackImg} alt="check"/>
//       <span> {text} </span>
//       <img src={closeImg} alt="close"/>
//     </div>
//   )
// }


export const Feedback = (props) => {
    
    const { feedbackList, position, autoDelete, autoDeleteTime } = props;
    const [list, setList] = useState(feedbackList);
    const [text, setText] = useState("Texto do feedback")

    useEffect(() => {
        setList([...feedbackList]);
    }, [feedbackList]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && feedbackList.length && list.length) {
                deleteFeedback(feedbackList[0].id);
            }
        }, autoDeleteTime);

        return () => {
            clearInterval(interval);
        }
    }, [feedbackList, autoDelete, autoDeleteTime, list]);

    const deleteFeedback = id => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const feedbackListItem = feedbackList.findIndex(e => e.id === id);
        list. splice(listItemIndex, 1);
        feedbackList.splice(feedbackListItem, 1);
        setList([...list]);
    }

    return (
        <div className="feedback-container">
        <img src={feedbackImg} alt="check"/>
        <span> {text} </span>
        <img src={closeImg} alt="close"/>
        </div>
    )


    Feedback.propTypes = {
        feedbackList: PropTypes.array.isRequired,
        position: PropTypes.string.isRequired,
        autoDelete: PropTypes.bool,
        autoDeleteTime: PropTypes.number
    }
}
