import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

// const {loadFromStorage, saveToStorage, makeId, makeLorem, getRandomIntInclusive} = utilService

const MAIL_KEY = 'mailDB'

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

_createMails()

export const mailService = {
  query,
  get,
  post,
  put,
  remove,
  save,
  saveMailsData,
  getEmptyMail,
  getDefaultFilter,
  getFilterFromSearchParams
}

window.ms = mailService

const mailsData = [
  {
    id: 'e101',
    createdAt: 1551133930500,
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    isStar: false,
    isSelected: false,
    isDraft: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
  },
  {
    id: 'e102',
    createdAt: 1551133930500,
    subject: 'Meeting Reminder',
    body: 'Do not forget about our meeting tomorrow at 10 AM. Let me know if you have any questions.',
    isRead: true,
    isStar: false,
    isSelected: false,
    isDraft: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'bobo@bobo.com',
    to: 'user@appsus.com'
  },
  {
    id: 'e103',
    createdAt: 1551133930500,
    subject: 'THIRD MAIL',
    body: 'YuGiOh for all time longgggg!!',
    isRead: false,
    isStar: false,
    isSelected: false,
    isDraft: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'roro@roro.com',
    to: 'user@appsus.com'
  }
]

function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    // console.log('mails: ',mails)

    if (!mails || !mails.length) {
      mails = mailsData
      utilService.saveToStorage(MAIL_KEY, mails)
    }

    let filteredMails = [...mails]

    if (filterBy.subject) {
      const regExp = new RegExp(filterBy.subject, 'i')

      filteredMails = filteredMails.filter(
        (mail) =>
          regExp.test(mail.subject) ||
          regExp.test(mail.body) ||
          regExp.test(mail.from)
      )
    }
    return filteredMails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function post(newEntity) {
  return storageService.post(MAIL_KEY, newEntity)
}

function put(updatedEntity) {
  return storageService.put(MAIL_KEY, updatedEntity)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    console.log('put')
    return put(mail)
  } else {
    console.log('post')
    return post(mail)
  }
}

function saveMailsData(updatedMails){
  return storageService.save(MAIL_KEY, updatedMails)
}

function getEmptyMail(to = '', subject = '', body = '') {
  return {
    // id: utilService.makeId(),
    createdAt: Date.now(),
    subject,
    body,
    isRead: false,
    isStar: false,
    isSelected: false,
    isDraft: false,
    sentAt: Date.now(),
    removedAt: null,
    from: loggedinUser.email,
    to
  }
}

function getDefaultFilter() {
  return { status: '', txt: '', isRead: false, isStared: false, lables: [] }
}

// const filterBy = {
//   status: 'inbox/sent/trash/draft',
//   txt: 'puki',
//   isRead: true,
//   isStared: true,
//   lables: ['important', 'romantic']
// }

function getFilterFromSearchParams(searchParams) {
  const subject = searchParams.get('subject') || ''

  return { subject }
  // return {removedAt}
}

function _createMails() {
  const mails = utilService.loadFromStorage(MAIL_KEY) || []

  if (mails.length > 0) return

  for (let i = 0; i < 20; i++) {
    const emailDomains = ['gmail', 'yahoo', 'outlook', 'hotmail']
    const emailNames = ['mike6', 'jon233', 'noga1', 'refael155']

    const randomIdx = utilService.getRandomIntInclusive(
      0,
      emailDomains.length - 1
    )
    const mailFrom = `${emailNames[randomIdx]}@${emailDomains[randomIdx]}.com`
    const mailSubject = utilService.setUpperCase(utilService.makeLorem(2))
    const mailBody = utilService.setUpperCase(utilService.makeLorem(10))

    const randomIsRead = utilService.getRandomIntInclusive(0, 1) ? true : false
    const randomIsStar = utilService.getRandomIntInclusive(0, 1) ? true : false

    const mail = {
      id: utilService.makeId(),
      createdAt: 1551133930500,
      subject: mailSubject,
      body: mailBody,
      isRead: randomIsRead,
      isStar: randomIsStar,
      isSelected: false,
      isDraft: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: mailFrom,
      to: 'user@appsus.com'
    }
    mails.push(mail)
  }
  utilService.saveToStorage(MAIL_KEY, mails)
}
