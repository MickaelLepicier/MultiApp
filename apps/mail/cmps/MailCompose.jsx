import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect, useRef } = React

const { useParams, useNavigate, Link } = ReactRouterDOM

// const { useNavigate, useSearchParams, Link, Outlet } = ReactRouterDOM

export function MailCompose({ mailId, setMails, onClose }) {

  const [mail, setMail] = useState(mailService.getEmptyMail())


  // const { mailId } = useParams()

  // const navigate = useNavigate()

  // const header = mail.subject || 'New Message'

  useEffect(() => {
    if (mailId === 'new') return

    loadMail()
  }, [mailId])

  function loadMail() {
    mailService
      .get(mailId)
      .then(setMail)
      .catch((err) => console.log('Fail to load the mail: ', err))
  }

  function handleSubmit(ev) {
    ev.preventDefault()

    const msg = mailId === 'new' ? 'Added' : 'Updated'

    mailService
      .save(mail)
      .then((mailSaved) => {
        // console.log('mailSaved: ',mailSaved)
        setTheMails(mailSaved)
        showSuccessMsg(`The mail is ${msg}`)
        onClose()
      })
      .catch((err) => {
        console.log(err)
        showErrorMsg(`Fail to ${msg} the mail`)
      })
      .finally(onClose)
  }

  function handleChange({ target }) {
    const { name: field, value } = target
    setMail((prevMail) => ({ ...prevMail, [field]: value }))
  }

  function saveAndClose() {
    if (!mail.to && !mail.subject && !mail.body){
      onClose()
      return
    }
    
    mail.isDraft = true

    mailService
      .save(mail)
      .then((mailSaved) => {
        setTheMails(mailSaved)
        showSuccessMsg(`The mail is in the Draft`)
        onClose()
      })
      .catch((err) => {
        console.log(err)
        showErrorMsg(`Fail to sent to the Draft`)
      })
      .finally(onClose)

  }

  function setTheMails(mailSaved) {
    setMails((prevMails) => {
      const idx = prevMails.findIndex((m) => m.id === mailId)
      if (idx !== -1) {
        const updateMails = [...prevMails]
        updateMails[idx] = mailSaved
        return updateMails
      } else {
        return [mailSaved, ...prevMails]
      }
    })
  }

  if (!mail) return <div>Loading...</div>

  return (
    // <section className="mail-edit-container">
    <section className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>{mailId === 'new' ? 'New Message' : 'Edit Message'}</h2>
          <button className="close-btn" onClick={saveAndClose}>
            &times;
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <input type="email" name="to" placeholder="To" value={mail.to || ''} onChange={handleChange} required />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={mail.subject || ''}
            onChange={handleChange}
            required
          />
          <textarea
            name="body"
            placeholder="Compose your mail..."
            value={mail.body || ''}
            onChange={handleChange}
            required
          />
          <button className="send-btn">Send</button>
        </form>
      </div>
    </section>
  )
}
