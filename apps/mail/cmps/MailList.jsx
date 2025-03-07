import { MailPreview } from './MailPreview.jsx'

const { Fragment } = React

// const {useOutletContext} = ReactRouterDOM


export function MailList({ mails, handleChange, onRemove, onRead, openCompose }) {

if(!mails) return <div>Loading...</div>

  return (
    <section className="mail-items">
      {mails.map((mail, index) => {
        // console.log('mail.id: ',mail.id)
        return (
          <Fragment key={index}>
             {/* TODO - input type="checkbox" to catch all */}
            <MailPreview
              mail={mail}
              handleChange={handleChange}
              onRemove={onRemove}
              onRead={onRead}
              openCompose={openCompose}
            />

            {/* <button className="mail-delete" onClick={() => onRemove(id)}>🗑️</button> */}
          </Fragment>
        )
      })}
    </section>
  )
}
