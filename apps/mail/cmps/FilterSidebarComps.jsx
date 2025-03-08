import { MailList } from './MailList.jsx'

const { useOutletContext } = ReactRouterDOM

export function MailInbox() {
  const { mails, handleChange, onRemove, onRead } = useOutletContext()

  
  const filteredMails = mails.filter((mail) => {
    const isFrom = mail['from'] !== 'user@appsus.com'
    const isRemovedAt = mail['removedAt'] === null
    const isDraft = mail['isDraft'] === false

    return isFrom && isRemovedAt && isDraft
  })

  if (!filteredMails || !filteredMails.length)
    return <div>There are no mails</div>

  return (
    <section className="inbox-container">
      <MailList
        mails={filteredMails}
        handleChange={handleChange}
        onRemove={onRemove}
        onRead={onRead}
      />
    </section>
  )
}

export function MailStarred() {
  const { mails, handleChange, onRemove, onRead } = useOutletContext()

  const filteredMails = mails.filter((mail) => {
    const isStar = mail['isStar'] === true
    const isRemovedAt = mail['removedAt'] === null

    return isStar && isRemovedAt
  })

  if (!filteredMails || !filteredMails.length)
    return <div>There are no mails</div>

  return (
    <section className="inbox-container">
      <MailList
        mails={filteredMails}
        handleChange={handleChange}
        onRemove={onRemove}
        onRead={onRead}
      />
    </section>
  )
}

export function MailSent() {
  const { mails, handleChange, onRemove, onRead } = useOutletContext()

  const filteredMails = mails.filter((mail) => {
    const isFrom = mail['from'] === 'user@appsus.com'
    const isRemovedAt = mail['removedAt'] === null
    const isIsDraft = mail['isDraft'] === false

    return isFrom && isRemovedAt && isIsDraft
  })

  if (!filteredMails || !filteredMails.length)
    return <div>There are no mails</div>

  return (
    <section className="inbox-container">
      <MailList
        mails={filteredMails}
        handleChange={handleChange}
        onRemove={onRemove}
        onRead={onRead}
      />
    </section>
  )
}

export function MailDraft() {
  const { mails, handleChange, onRemove, onRead, openCompose } =
    useOutletContext()

  const filteredMails = mails.filter((mail) => {
    const isDraft = mail['isDraft'] === true
    const isRemovedAt = mail['removedAt'] === null

    return isDraft && isRemovedAt
  })

  if (!filteredMails || !filteredMails.length)
    return <div>There are no mails</div>

  return (
    <section className="draft-container">
      <MailList
        mails={filteredMails}
        handleChange={handleChange}
        onRemove={onRemove}
        openCompose={openCompose}
        onRead={onRead}
      />
    </section>
  )
}

export function MailTrash() {
  const { mails, handleChange, onRemove, onRead } = useOutletContext()

  const filteredMails = mails.filter((mail) => mail['removedAt'] === true)

  if (!filteredMails || !filteredMails.length)
    return <div>There are no mails in the trash</div>

  return (
    <section className="trash-container">
      <MailList
        mails={filteredMails}
        handleChange={handleChange}
        onRemove={onRemove}
        onRead={onRead}
      />
    </section>
  )
}
