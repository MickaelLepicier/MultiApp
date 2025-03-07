const { useState } = React

export function LongText({ description }) {
  if (!description) return ''
  if (description.length <= 100) return description

  const [isExpanded, setIsShown] = useState(false)

  const previewText = description.slice(0, 100)
  const toggleBtnText = isExpanded ? 'Less...' : 'More...'
  const displayedText = isExpanded ? description : `${previewText}...`

  return (
    <React.Fragment>
      {displayedText}
      <button className="long-text-btn" onClick={() => setIsShown(!isExpanded)}>
        {toggleBtnText}
      </button>
    </React.Fragment>
  )
}
