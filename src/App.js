import React from 'react'
import './App.css'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      realName: '',
      secretName: '',
    }

    this.handleRealNameChange = this.handleRealNameChange.bind(this)
    this.handleSecretNameChange = this.handleSecretNameChange.bind(this)
    this.getAvailableChars = this.getAvailableChars.bind(this)
  }

  handleRealNameChange(ev) {
    this.setState({ realName: ev.target.value })
  }

  handleSecretNameChange(ev) {
    const newVal = ev.target.value
    const oldVal = this.state.secretName
    const newChar = newVal[newVal.length - 1]

    const isNewCharAdded = (newVal.length > oldVal.length)
    const isNewCharSpace = newChar === ' '
    const isCharAvailable = this.getAvailableChars().includes(newChar)
    const isCharsReduced = (newVal.length < oldVal.length)

    if ((isNewCharAdded && !isNewCharSpace && isCharAvailable) || isCharsReduced)
      this.setState({ secretName: ev.target.value })
  }

  getAvailableChars() {
    const all = this.state.realName.split('').filter(x => x !== ' ')
    const used = this.state.secretName.split('').filter(x => x !== ' ')
    const available = used.reduce((remaining, usedChar) => {
      const matchedIndex = remaining.findIndex(remainingChar => remainingChar === usedChar)
      return matchedIndex === -1 ? remaining : removeItem(remaining, matchedIndex)
    }, all)

    return available
  }

  render() {
    const { vowels, consonants } = groupChars(this.getAvailableChars())
    return (
      <div className='secret-name-editor'>
        <div className='secret-name-editor__input-group'>
          <div className="secret-name-editor___label">Real Name:</div>
          <input
            type="text"
            name='realName'
            className="secret-name-editor___input"
            value={this.state.realName}
            onChange={this.handleRealNameChange}
          />
        </div>
        <div className='secret-name-editor__input-group'>
          <div className="secret-name-editor___label">Secret Name:</div>
          <input
            type="text"
            name='secretName'
            className="secret-name-editor___input"
            value={this.state.secretName}
            onChange={this.handleSecretNameChange}
          />
        </div>
        <div className='secret-name-editor__input-group'>
          <div className="secret-name-editor___label">Remaining Consonants:</div>
          {consonants.length ? consonants.join(', ') : '(none)'}
        </div>
        <div className='secret-name-editor__input-group'>
          <div className="secret-name-editor___label">Remaining Vowels:</div>
          {vowels.length ? vowels.join(', ') : '(none)'}
        </div>
      </div>
    )
  }
}

const removeItem = (arr, i) => arr.slice(0, i).concat(arr.slice(i + 1))
const groupChars = chars =>
  chars.reduce((acc, char) => {
    const type =  ['a', 'e', 'i', 'o', 'u'].includes(char) ? 'vowels' : 'consonants'

    return {
      ...acc,
      [type]: [...acc[type], char],
    }
  }, { vowels: [], consonants: [] })

export default App
