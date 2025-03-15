const { useState, useEffect, useRef } = React

export function OutletMailHeader({ mails, setMails, onRemove, onRead, handleChange }) {
  // TODOs:
  //V Create indbox btn for - Select all || UnSelect all
  //V If one of the mails is isSelected = true so I put - in the checkbox
  
  // TODO keep working on that
  // Create Delete & Read || UnRead btns

  // btns functionality:
  // Delete - check the first 50 mails if isSelected delete
  // Read - check the first 50 mails if isRead Read || UnRead
  // (if 1 mail is !isRead so the option is isRead === true )
  const checkboxRef = useRef(null)

  const allSelected = mails.every((mail) => mail.isSelected)

  const someSelected = mails.some((mail) => mail.isSelected)

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = !allSelected && someSelected
    }
  }, [allSelected, someSelected])

  function onSelectAll() {
    setMails((prevMails) => prevMails.map((mail) => ({ ...mail, isSelected: !allSelected })))
  }
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
      
      */}
    </section>
  )
}
