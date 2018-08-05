import React, { Component } from 'react'
import axios from 'axios'
import QuizForm from './quizform';
import Result from './result';

export default class MoodQuiz extends Component {
  constructor() {
    super()
    this.state = {
      loaded: false,
      questions: [],
      currentQuestion: 0,
      energyAnswers: [],
      moodAnswers: []
    }
    this.answerQuestion = this.answerQuestion.bind(this)
  }

  answerQuestion(category, answer) {
    if (category === 'mood') {
      this.setState(prevState => ({
        currentQuestion: prevState.currentQuestion + 1,
        moodAnswers: prevState.moodAnswers.length ? [...prevState.moodAnswers, answer] : [answer]
      }))
    } else if (category === 'energy') {
      this.setState(prevState => ({
        currentQuestion: prevState.currentQuestion + 1,
        energyAnswers: prevState.energyAnswers.length ? [...prevState.energyAnswers, answer] : [answer]
      }))
    }
  }

  async componentDidMount() {
    const { data } = await axios.get('/api/quiz')
    this.setState({
      questions: data,
      loaded: true
    })
  }

  render() {
    if (this.state.loaded && (this.state.currentQuestion === this.state.questions.length)) {
      const moodScore = this.state.moodAnswers.reduce((sum, current) => sum + current) / 3
      const energyScore = this.state.energyAnswers.reduce((sum, current) => sum + current) / 3
      return <Result moodScore={moodScore} energyScore={energyScore} />
    } else if (this.state.loaded) {
      const { questions, currentQuestion } = this.state
      return <QuizForm answerQuestion={this.answerQuestion} question={questions[currentQuestion]} />
    } else {
      // display a loader?
      return null
    }
  }
}
