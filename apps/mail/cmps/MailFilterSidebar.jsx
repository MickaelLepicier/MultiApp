const { Link } = ReactRouterDOM

const { useState } = React

export function MailFilterSidebar({
  openCompose,
  isWide,
  isBtnWideClicked,
  setIsWide
}) {
  // TODO
  // make ['Inbox', 'Starred'...].map(....) or with a function

  const [active, setActive] = useState('inbox')

  function onCompose() {
    openCompose()
  }

  function onSetActive(currActive) {
    return active === currActive ? 'mail-sidebar-active' : ''
  }

  function onUpdateIsWide(boolean) {
    if (!isBtnWideClicked) return

    
    let timeout

    if (boolean) {
      timeout = setTimeout(() => {
        console.log('timeout')
        setIsWide(boolean)
      }, 800)
      return
    }

    clearTimeout(timeout)
    setIsWide(boolean)
  }

  const isCollapse = isWide ? '' : 'collapsed'

  return (
    <section
      className={`mail-filterBar-container ${isCollapse}`}
      onMouseEnter={() => onUpdateIsWide(true)}
      onMouseLeave={() => onUpdateIsWide(false)}
    >
      <button className="compose-btn" onClick={onCompose}>
        <i className="fas fa-pen"></i> <span>Compose</span>
      </button>

      <Link to="/mail/inbox" onClick={() => setActive('inbox')}>
        <p className={onSetActive('inbox')}>
          <img src="/apps/mail/img/icon/inbox.png" alt="icon-img" />
          <span>Inbox</span>
        </p>
      </Link>

      <Link to="/mail/starred" onClick={() => setActive('starred')}>
        <p className={onSetActive('starred')}>
          <img src="/apps/mail/img/icon/star.png" alt="icon-img" />
          <span>Starred</span>
        </p>
      </Link>

      <Link to="/mail/sent" onClick={() => setActive('sent')}>
        <p className={onSetActive('sent')}>
          <img src="/apps/mail/img/icon/sent.png" alt="icon-img" />
          <span>Sent</span>
        </p>
      </Link>

      <Link to="/mail/draft" onClick={() => setActive('draft')}>
        <p className={onSetActive('draft')}>
          <img src="/apps/mail/img/icon/draft.png" alt="icon-img" />
          <span>Draft</span>
        </p>
      </Link>

      <Link to="/mail/trash" onClick={() => setActive('trash')}>
        <p className={onSetActive('trash')}>
          <img src="/apps/mail/img/icon/trash.png" alt="icon-img" />
          <span>Trash</span>
        </p>
      </Link>
    </section>
  )
}
