const { useNavigate, useOutletContext, useParams } = ReactRouterDOM

const { useState, useEffect, useRef } = React

export function MailDetails() {
  const { mails, handleChange, onRemove, onRead, openCompose } =
    useOutletContext()

    const { mailId } = useParams()

  const navigate = useNavigate()

  const mail = mails.find((mail) => mail.id === mailId)

  if (!mail) return <div>Loading... </div>
  return (
    <section className="mail-details">
      <header className="mail-details-header">
        <h2>{mail.subject}</h2>

        <div>
          <button className="btn-action" onClick={() => onRemove(mail.id)}>
            <img
              src="/apps/mail/img/icon/trash.png"
              alt="trash-icon"
              className="trash-icon"
            />
          </button>
          <button className="btn-action" onClick={() => navigate('/mail/inbox')}>
            <img src="/apps/mail/img/icon/right-arrow.png" alt="back-icon" className="trash-icon"/>
          </button>
        </div>
      </header>

      <div className="mail-details-meta">
        <p>
          <strong>From:</strong> {mail.from}
        </p>

        <p className="mail-details-date">
          {new Date(mail.createdAt).toLocaleDateString('he')}
        </p>
      </div>

      <div className="mail-details-body">
        <p>{mail.body}</p>
      </div>

      <footer className="mail-actions">
        <button onClick={() => openCompose(mail.id)}>Reply</button>
        <button onClick={() => openCompose(mail.id)}>Forward</button>
      </footer>
    </section>
  )
}
