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
      <div className="container text-center">
        <label>{question.name}</label>
        <div className="row align-items-start">
          {
            question.choices.map(choice => {
              const value = choice.value
              return (
                <div
                  key={choice.id}
                  onClick={(evt) => this.handleSubmit(evt, question.category, value)}
                  className="col choice"
                >
                  <figure className="figure">
                    <img
                      src={choice.photoUrl}
                      className="img-thumbnail rounded figure-img"
                    />
                    <figcaption className="figure-caption">{choice.label}</figcaption>
                  </figure>
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
