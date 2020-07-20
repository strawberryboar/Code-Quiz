const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
//selects question container
const questionContainerElement = document.getElementById('question-container')

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

//this is to shuffle questions so the answers arent in the same spot every time
let shuffledQuestions, currentQuestionIndex

//when start button is clicked, start game
startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
    //incrementing questions
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    //sorts these questions in a random order making it go one way about half the time
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    //when you click start, it now shows the questions by removing hide
    questionContainerElement.classList.remove('hide')
    //calling function to show next questions
    setNextQuestion()
}

function setNextQuestion() {
    //resets everything to default state after every question
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if (answer.correct) {
        button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.appendChild(button)
    })
  }


  function resetState() {
    clearStatusClass(document.body)
    //after answer is clicked, next button shows up. it will reset for next question
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    //checking if the button clicked was correct
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    //seeing whether this should be set to correct or wrong
    setStatusClass(document.body, correct)
    //convert to array so it works with forEach
    //also setting status to check whether answer was correct
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
      })
    //checks if there are any more questions to go through
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
         //shows the next button again by removing hidden class
         nextButton.classList.remove('hide')
        } else {
        //if we are on the last question, show restart button
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
      }
    }


    function setStatusClass(element, correct) {
    //clear any status it already has
    clearStatusClass(element)
    //if answer is correct, want to assign the correct class
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
      }
    }

//remove the classes we assigned in setStatusClass
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }

//array of questions. these set answers to true or false
const questions = [
    {
      question: 'What is 2 + 2?',
      answers: [
        { text: '4', correct: true },
        { text: '22', correct: false }
      ]
    },
    {
      question: 'What is 4 + 4',
      answers: [
        { text: '8', correct: true },
        { text: '44', correct: false },
        { text: '40', correct: false },
        { text: '10', correct: false }
      ]
    },
    {
      question: 'What is 10 + 2',
      answers: [
        { text: '12', correct: true },
        { text: '102', correct: false },
        { text: '2', correct: false },
        { text: '10', correct: false }
      ]
    },
    {
      question: 'What is 4 * 2?',
      answers: [
        { text: '8', correct: true },
        { text: '6', correct: false }
      ]
    }
  ]