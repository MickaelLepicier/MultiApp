const { useNavigate, Link, useSearchParams } = ReactRouterDOM

export function MailFilterBar({ openCompose, isWide }) {
  // TODO
  // make ['Inbox', 'Starred'...].map(....) or with a function
  // put inbox as a default

  const navigate = useNavigate()

function onCompose(){
  openCompose()
  // navigate('/mail?compose=new')
}

const isCollapse = isWide ? '' : 'collapsed'

  return (
    <section className={`mail-filterBar-container ${isCollapse}`}>

      <button className="compose-btn" onClick={onCompose}>
          <i className="fas fa-pen"></i> <span>Compose</span> 
        </button>

      <Link to="/mail/inbox">
        <p>
          <img src="/apps/mail/img/icon/inbox.png" alt="icon-img" />
          <span>Inbox</span>
        </p>
      </Link>

      <Link to="/mail/starred">
        <p>
          <img src="/apps/mail/img/icon/star.png" alt="icon-img" />
          <span>Starred</span>
        </p>
      </Link>

      <Link to="/mail/sent">
        <p>
          <img src="/apps/mail/img/icon/sent.png" alt="icon-img" />
          <span>Sent</span>
        </p>
      </Link>

      <Link to="/mail/draft">
        <p>
          <img src="/apps/mail/img/icon/draft.png" alt="icon-img" />
          <span>Draft</span>
        </p>
      </Link>

      <Link to="/mail/trash">
        <p>
          <img src="/apps/mail/img/icon/trash.png" alt="icon-img" />
          <span>Trash</span>
        </p>
      </Link>
    </section>
  )
}
