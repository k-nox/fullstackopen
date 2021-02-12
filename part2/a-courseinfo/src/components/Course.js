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

const Total = ({ course }) => (
  <p key={course.parts.id}>
    total of {course.parts.reduce((sum, part) => (sum += part.exercises), 0)} exercises
  </p>
);

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
);

export default Course;
