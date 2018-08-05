import React, { Component } from 'react'

class QuizForm extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt, category, value) {
    evt.preventDefault()
    this.props.answerQuestion(category, value)
  }

  render() {
    const { question } = this.props
    return (
      <div className="question-container">
        <h4> Let's find out how you're doing today!</h4>
        <label>{question.name}</label>
        <div className="choice">
          {
            question.choices.map(choice => {
              const value = choice.value
              return (
                <div
                  key={choice.id}
                  onClick={(evt) => this.handleSubmit(evt, question.category, value)}
                  className="flex-item"
                >
                  <img src={choice.photoUrl} className="quiz-img" />
                  <h5>{choice.label}</h5>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default QuizForm
