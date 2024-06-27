import { useState, useEffect } from 'react';
import Description from './components/Description/Description';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';
import './App.css';

const feedbackData = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const getLsFeedbackData = () => {
  return localStorage.getItem('feedback-data') !== null ? JSON.parse(localStorage.getItem('feedback-data')) : feedbackData;
};

const App = () => {
  const [feedback, setFeedback] = useState(getLsFeedbackData);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem('feedback-data', JSON.stringify(feedback));
  }, [feedback]);

  useEffect(() => {
    const sumFeedback = Object.values(feedback).reduce((acc, value) => acc + value, 0);
    setIsVisible(sumFeedback > 0);
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    if (feedbackType === 'reset') {
      setFeedback(feedbackData);
    } else {
      setFeedback({
        ...feedback,
        [feedbackType]: feedback[feedbackType] + 1,
      });
    }
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = totalFeedback ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} isVisible={isVisible} />
      {totalFeedback ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
};

export default App;
