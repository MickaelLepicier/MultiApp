import { mailService } from '../services/mail.service.js'

const { useState, useEffect, useRef } = React
const { useLocation } = ReactRouterDOM

export function OutletMailHeader({
  mails,
  setMails,
  onRemove,
  onRead,
  handleChange
}) {
  // TODOs:
  //V Create indbox btn for - Select all || UnSelect all
  //V If one of the mails is isSelected = true so I put - in the checkbox
  //V Create Delete & Read || UnRead btns

  // TODO keep working on that
  // Fix BUG - the isSelect in the mails stays when I nav between comps
  // change the Read || unRead btn symbol as what it is going to do - Read || unRead
  // the scrolls should be just on the mailItems

  // btns functionality:
  // Delete - check the first 50 mails if isSelected delete
  // Read - check the first 50 mails if isRead Read || UnRead
  // (if 1 mail is !isRead so the option is isRead === true )

  const checkboxRef = useRef(null)
  const btnsRef = useRef(null)

  const allSelected = mails.every((mail) => mail.isSelected)

  const someSelected = mails.some((mail) => mail.isSelected)

  const isRead = true
  const readIcon = isRead ? 'read' : 'unread'

  const location = useLocation()

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = !allSelected && someSelected
    }

    if (btnsRef.current) {
      btnsRef.current.style.visibility =
        allSelected || someSelected ? 'visible' : 'hidden'
      // btnsRef.current.style.visibility = 'visible'
    }
  }, [allSelected, someSelected])

  function onSelectAll() {
    setMails((prevMails) =>
      prevMails.map((mail) => ({ ...mail, isSelected: !allSelected }))
    )
  }

  // TODO - question for Dori:
  // Is it better to have onSetRead & onSetRemove functions
  // or 1 function as onAction?

  function onSetRead() {
    // TODO - question for Dori:
    // Is it better to save each mail with onRead that in MailIndex
    // or Is it better to rewrite all the data with saveMailsData

    // mails.forEach((mail) => {
    //   if (mail.isSelected) {
    //     onRead(mail.id)
    //   }
    // })

    const updatedMails = mails.map((mail) => {
      // if(mail.isSelected) return {...mail, isRead: !mail.isRead}
      return mail.isSelected ? { ...mail, isRead: !mail.isRead } : mail
    })

    setMails(updatedMails)

    mailService.saveMailsData(updatedMails)
  }

  function onSetRemove() {
    const updatedMails = mails.map((mail) => {
      // if(mail.isSelected) return {...mail, isRead: !mail.isRead}
      return mail.isSelected ? { ...mail, removedAt: true } : mail
    })

    setMails(updatedMails)

    mailService.saveMailsData(updatedMails)
  }

  function onAction(actionType) {
    const isTrashComp = location.pathname.includes('/mail/trash')

    let updatedMails = mails.map((mail) => {
      if (actionType === 'read') {
        return mail.isSelected ? { ...mail, isRead: !mail.isRead } : mail
      }

      if (actionType === 'remove') {
        return mail.isSelected ? { ...mail, removedAt: true } : mail
      }
    })

    if (actionType === 'remove' && isTrashComp) {
      updatedMails = mails.filter((mail) => !mail.isSelected)
    }

    setMails(updatedMails)

    mailService.saveMailsData(updatedMails)

    /*


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

    */
  }

  // function checkMails(type){
  //  return mails.map(mail=> mail[type] === true)
  // }

  // console.log('isChecked: ',isChecked)

  return (
    <section className="outlet-mail-container">
      <span className="outlet-mail-checkbox">
        <input
          type="checkbox"
          ref={checkboxRef}
          className="mail-checkbox-icon outlet-checkbox-icon"
          checked={allSelected || false}
          onChange={onSelectAll}
        />
      </span>

      <div className="outlet-btns-action" ref={btnsRef}>
        <button className="btn-action" onClick={() => onAction('read')}>
          <img
            src={`/apps/mail/img/icon/${readIcon}.png`}
            alt="read-unread-icon"
            className="read-unread-icon"
          />
        </button>

        <div className="btn-separator">│</div>

        <button className="btn-action" onClick={() => onAction('remove')}>
          <img
            src="/apps/mail/img/icon/trash.png"
            alt="trash-icon"
            className="trash-icon"
          />
        </button>
      </div>

      {/* <span className="mail-checkbox">
        <input
          type="checkbox"
          name="isSelected"
          checked={isSelected || false}
          className="mail-checkbox-icon"
          data-id={id}
          onChange={onHandleChange}
        />
      </span> 
      

      <div className="btns-action">
        <button className="btn-action" onClick={() => onRead(id)}>
          <img src={`/apps/mail/img/icon/${readIcon}.png`} alt="read-unread-icon" className="read-unread-icon" />
        </button>

        <button className="btn-action" onClick={() => onRemove(id)}>
          <img src="/apps/mail/img/icon/trash.png" alt="trash-icon" className="trash-icon" />
        </button>
        </div>

      
      */}
    </section>
  )
}
