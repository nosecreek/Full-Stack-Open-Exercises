import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logout from './Logout'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = () => {
  const user = useSelector(({ user }) => user)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">Users</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {user ? (
            <>
              <span className="navbar-text">Logged in as {user.name}</span>
              <Logout />
            </>
          ) : (
            <Button
              style={{ margin: '0 0.5rem' }}
              variant="outline-primary"
              as={Link}
              to="/login"
            >
              Login
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
