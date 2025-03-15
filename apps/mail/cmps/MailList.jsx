import { MailPreview } from './MailPreview.jsx'

const { Fragment } = React

// const {useOutletContext} = ReactRouterDOM


export function MailList({ mails, handleChange, onRemove, onRead, openCompose }) {

if(!mails) return <div>Loading...</div>

  return (
    <section className="mail-items">
      {mails.map((mail, index) => {
        return (
          <Fragment key={index}>
            <MailPreview
              mail={mail}
              handleChange={handleChange}
              onRemove={onRemove}
              onRead={onRead}
              openCompose={openCompose}
            />

          </Fragment>
        )
      })}
    </section>
  )
}
