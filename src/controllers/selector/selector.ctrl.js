require('./selector.scss');

/**
 * Selector Controller
 * Component to build a one line selector
 * between different options via arrows
 * The class used for the parent element
 * is .selector, all childs are .selector-item
 */
class SelectorCtrl {

  /**
   * Setup the template and different options
   * See `setChoices` method to understand the
   * format of the following parameters
   * @param {Array} choiceList List of key/values to display
   */
  constructor (choiceList, defaultChoice) {
    this.selectionIndex = 0
    this.setupTemplate()
    this.setChoices(choiceList)
  }

  /**
   * Build template of the controller
   * @return {DOMElement}
   */
  setupTemplate () {
    this.el = document.createElement('div')
    this.el.setAttribute('class', 'selector selectbox')

    // Arrow buttons
    this.btnLeft = document.createElement('span')
    this.btnLeft.setAttribute('class', 'selectbox-item active selector-left')
    this.btnLeft.textContent = '<'
    this.el.appendChild(this.btnLeft)
    this.btnRight = document.createElement('span')
    this.btnRight.setAttribute('class', 'selectbox-item active selector-right')
    this.btnRight.textContent = '>'
    this.el.appendChild(this.btnRight)

    // Screen
    this.labelEl = document.createElement('span')
    this.labelEl.setAttribute('class', 'selectbox-item selector-label')
    this.el.appendChild(this.labelEl)

    return this.el
  }

  /**
   * Set up listeners
   */
  init () {
    this.btnLeft.addEventListener('click', this.previous.bind(this))
    this.btnRight.addEventListener('click', this.next.bind(this))
  }

  /**
   * Set up the different available choices
   * Choice list format:
   * [
   *   { value: <int>, label: <string>, default: <boolean> },
   *   { value: 2, label: 'Easy'},
   *   { value: 3, label: 'Medium', default: true},
   *   { value: 4, label: 'Hard'},
   * ]
   * @param {Array} choiceList List of options to display
   */
  setChoices (choiceList) {
    this.choices = choiceList
    this.selectionIndex = this.choices.findIndex(item => item.default) || 0
    this.updateLabel()
  }

  /**
   * Update the counter DOM to the value
   * set in the instance
   * @return {int} The new value of the counter
   */
  updateLabel () {
    this.selectionIndex = (this.selectionIndex + this.choices.length) % this.choices.length
    let choice = this.choices[this.selectionIndex]
    this.labelEl.textContent = choice.label
    if (this.selectCallback)
      this.selectCallback(this.choices[this.selectionIndex])
    return this.selectionIndex
  }

  /**
   * Decrement the counter
   * @return {int} The new value of the counter
   */
  next () {
    this.selectionIndex++
    return this.updateLabel()
  }

  /**
   * Increment the counter
   * @return {int} The new value of the counter
   */
  previous () {
    this.selectionIndex--
    return this.updateLabel()
  }

  /**
   * Listener for when a new item is selected
   * The listener will be called with only one
   * parameter: the new selected value
   * @param  {function} listener Select listener to set
   */
  onSelect (listener) {
    this.selectCallback = listener
  }

  /**
   * Return the current choice selected
   * @return {int}
   */
  getValue () {
    let choice = this.choices[this.selectionIndex]
    return choice && choice.value
  }
}

export default SelectorCtrl