import styles from './Options.module.css'


function Options({ updateFeedback, isVisible }) {
  return (
    <div className={styles.wrapper}>
      <button onClick={() => updateFeedback ('good')}>Good</button>
      <button onClick={() => updateFeedback ('neutral')}>Neutral</button>
      <button onClick={() => updateFeedback ('bad')}>Bad</button>
      {isVisible && <button onClick={() => updateFeedback('reset')}>Reset</button>}
    </div>
  );
}

export default Options