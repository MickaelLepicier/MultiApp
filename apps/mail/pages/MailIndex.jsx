


import { mailService } from '../services/mail.service.js'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailFilterSidebar } from '../cmps/MailFilterSidebar.jsx'
// import { MailList } from '../cmps/MailList.jsx'
import {
  showErrorMsg,
  showSuccessMsg
} from '../../../services/event-bus.service.js'

const { useState, useEffect, useRef } = React

const { useNavigate, useSearchParams, Link, Outlet } = ReactRouterDOM

export function MailIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const composeParam = searchParams.get('compose')

  const [mails, setMails] = useState(null)
  // console.log('mails: ', mails)

  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromSearchParams(searchParams)
  )

  // const [mailId, setMailId] = useState('')
  // const [mailsSelected, setMailsSelected] = useState([])

  // const [isCompose, setIsCompose] = useState(false)

  const [isWide, setIsWide] = useState(true)
  const [isBtnWideClicked, setIsBtnWideClicked] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setSearchParams(filterBy)
    loadMails()
  }, [filterBy])

  function loadMails() {
    mailService
      .query(filterBy)
      .then(setMails)
      .catch((err) => {
        console.log('Could not get the Mails Data: ', err)
      })
  }

  function onSetIsWide() {
    setIsWide(!isWide)
    setIsBtnWideClicked(!isBtnWideClicked)
  }

  function openCompose(mailId = 'new') {
    setSearchParams({ compose: mailId })
  }

  function closeCompose() {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams)
      newParams.delete('compose')
      return newParams
    })
  }

  function onSetFilter(filterByToEdit) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterByToEdit }))
  }

  function onRemove(mailId) {
    const mail = mails.find((mail) => mail.id === mailId)
    if (!mail) console.log('Failed to find the mail')

    if (!mail.removedAt) {
      const updatedMail = { ...mail, removedAt: true }

      setMails((prevMails) =>
        prevMails.map((mail) => (mail.id === mailId ? updatedMail : mail))
      )
      navigate('/mail/inbox')

      mailService
        .save(updatedMail)
        .then((mail) => {
          // console.log('Mail Updated', mail)

          showSuccessMsg('Mail has been removed to Trash')
        })
        .catch((err) => {
          console.log('Fail to Update', err)
          showErrorMsg('Mail has not been Deleted')
          navigate('/mail')
        })

      return
    }

    mailService
      .remove(mailId)
      .then(() => {
        setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId))
        showSuccessMsg('Mail has been Deleted')
      })
      .catch((err) => {
        console.log('Fail to delete the mail', err)
        showErrorMsg('Fail to delete the mail')
        // navigate('/mail')
      })
  }

  function onRead(mailId) {
    const mail = mails.find((mail) => mail.id === mailId)
    if (!mail) {
      console.log('Failed to find the mail')
      return
    }

    const updatedMail = { ...mail, isRead: !mail.isRead }

    setMails((prevMails) =>
      prevMails.map((mail) => (mail.id === mailId ? updatedMail : mail))
    )

    mailService
      .save(updatedMail)
      .then()
      .catch((err) => {
        console.log('Fail to update the read, unread', err)
      })
  }

  function handleChange({ target }) {
    let { type, name: field, value } = target
    const id = target.dataset.id

    if (type === 'checkbox') value = target.checked

    setMails((prevMails) => {
      return prevMails.map((mail) =>
        mail.id === id ? { ...mail, [field]: value } : mail
      )
    })

    const mail = mails.find((mail) => mail.id === id)
    if (!mail) console.log('Could not find the mail')

    const updatedMail = { ...mail, [field]: value }

    mailService
      .save(updatedMail)
      .then((mail) => console.log('The mail has been updated'))
      .catch((err) => console.log('Failed to updated the mail: ', err))
  }

  const isCollapse = isWide ? '' : 'collapse'
  if (!mails) return <div>Loading...</div>

  return (
    <section className="mail-index-container">
      <MailHeader
        onSetIsWide={onSetIsWide}
        filterBy={filterBy}
        onSetFilter={onSetFilter}
      />

      <main className={isCollapse}>
        <MailFilterSidebar openCompose={openCompose} isWide={isWide} isBtnWideClicked={isBtnWideClicked} setIsWide={setIsWide} />

        <div className="outlet-container">
          <Outlet
            context={{ mails, handleChange, onRemove, onRead, openCompose }}
          />
        </div>
        
        {composeParam && (
          <MailCompose
            mailId={composeParam}
            setMails={setMails}
            onClose={closeCompose}
          />
        )}
      </main>
    </section>
  )
}
