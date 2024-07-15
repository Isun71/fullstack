import React, { useState } from 'react';

const Total = ({ good, neutral, bad }) => good + neutral + bad;

const Average = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  return total > 0 ? (good - bad) / total : 0;
};

const Positive = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  return total > 0 ? (good / total) * 100 : 0;
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = Total({ good, neutral, bad });
  const average = Average({ good, neutral, bad });
  const positive = Positive({ good, neutral, bad });

  return (
    <div>
      <h2>Statistics</h2>
      {total > 0 ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={average.toFixed(1)} />
            <StatisticLine text="positive" value={`${positive.toFixed(1)}%`} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
