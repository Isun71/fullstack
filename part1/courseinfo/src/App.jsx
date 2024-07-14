import React from 'react';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ contents }) => {
  return (
    <div>
      {contents.map((content, index) => (
        <Part key={index} part={content.part} exercises={content.exercises} />
      ))}
    </div>
  );
};

const Total = ({ contents }) => {
  const total = contents.reduce((sum, content) => sum + content.exercises, 0);
  return (
    <p>
      Number of exercises {total}
    </p>
  );
}

const App = () => {
  const course = 'Half Stack application development';
  const contents = [
    {
      part: 'Fundamentals of React',
      exercises: 10,
    },
    {
      part: 'Using props to pass data',
      exercises: 7,
    },
    {
      part: 'State of a component',
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content contents={contents} />
      <Total contents={contents} />
    </div>
  );
};

export default App;
