import { useState, useEffect } from 'react';
import Description from './components/Description/Description';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
// import Notification from './components/Notification/Notification';
import './App.css';

const feedbackData = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const App = () => {
  const [feedback, setFeedback] = useState(feedbackData);
  const [isVisible, setIsVisible] = useState(false);

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
  const positiveFeedback = totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  return (
    <div className="App">
      <Description />
      <Options updateFeedback={updateFeedback} isVisible={isVisible} />
      <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback} />
    </div>
  );
};

export default App;
