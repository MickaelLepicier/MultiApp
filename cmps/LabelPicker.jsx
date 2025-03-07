import { utilService } from '../services/util.service.js'

const { useState, useEffect, useRef, Fragment } = React

export function LabelPicker({handleChange}) {
  const [lable, setLable] = useState([])

  function onSubmit(ev) {
    ev.preventDefault

    const value = ev.target.value
    console.log('value: ', value)
    setLable(prevLable => ({...prevLable, value}))
    // later on - save the data on handleChange to render the father comp 
    // later on - save label on the service (utilService.saveToStorage)
  }

  return (
    <form className="lable-picker" onSubmit={onSubmit}>
      <label for="lable">Choose a lable:</label>
      <select className="lable" name="lable">
        <option value="critical">Critical</option>
        <option value="family">Family</option>
        <option value="work">Work</option>
        <option value="friends">Friends</option>
        <option value="spam">Spam</option>
        <option value="memories">Memories</option>
        <option value="romantic">Romantic</option>
      </select>

      {/* <button>Submit</button> */}
    </form>
  )

}
