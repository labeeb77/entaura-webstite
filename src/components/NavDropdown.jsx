function NavDropdown({ className, open, trigger, children }) {
  const classes = ['nav-dropdown', className, open && 'open'].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      {trigger}
      {children}
    </div>
  )
}

export default NavDropdown
