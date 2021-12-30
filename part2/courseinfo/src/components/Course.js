import React, { useState } from 'react'

const Header = ({ title }) => {
    return (
        <h1>{title}</h1>
    )
}

const Total = ({ parts }) => {
    const sum = parts.reduce((previous, current) => previous + current.exercises, 0)
    return (
        <p>Number of exercises {sum}</p>
    )
}

const Part = (props) => {
    return (
        <p>
        {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
        {parts.map(part =>
            <Part part={part} key={part.id} />
        )}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
        <Header title={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
    )
}

export default Course