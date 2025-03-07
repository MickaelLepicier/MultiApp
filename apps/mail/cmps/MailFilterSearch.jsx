import { utilService } from '../../../services/util.service.js'

const { useState, useEffect, useRef } = React

export function MailFilterSearch({ filterBy, onSetFilter }) {
 
  const [mailsFilter, setMailsFilter] = useState({ ...filterBy })
  const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter, 500))
 
  // console.log('mailsFilter: ',mailsFilter)


  useEffect(() => {
    onSetFilterDebounce.current(mailsFilter)
  }, [mailsFilter])

  function handleChange({ target }) {
    const { type, name: field, value } = target

    setMailsFilter((prevMailsFilter) => ({
      ...prevMailsFilter,
      [field]: value
    }))
  }

  return (
    <section className="search-bar-container">
      {/* <form action=""></form> */}
      <i className="fas fa-search search-icon"></i>
      <input
        type="text"
        name="subject"
        className="search-input"
        placeholder="Search Mail"
        value={mailsFilter.subject || ''}
        onChange={handleChange}
      />

     
    </section>
  )
}
