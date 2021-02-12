import React from 'react';

const Header = ({ course }) => <h1>{course.name}</h1>;

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = ({ course }) => (
  <div>
    {course.parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

/* const Total = ({ course }) => {
  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;
  return <p>Number of exercises {sum}</p>;
}; */

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
  </div>
);

export default Course;
