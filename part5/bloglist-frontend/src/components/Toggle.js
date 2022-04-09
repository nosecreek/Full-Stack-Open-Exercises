import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

const Toggle = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="primary" onClick={toggleVisibility}>
          {props.label}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <br />
        <Button variant="warning" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  )
})

Toggle.displayName = 'Toggle'

export default Toggle
