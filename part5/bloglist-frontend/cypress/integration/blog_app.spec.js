describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', {
      username: 'testuser1',
      name: 'Test',
      password: 'password123'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser1')
      cy.get('#password').type('password123')
      cy.get('#login-button').click()

      cy.contains('Welcome Test')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser1')
      cy.get('#password').type('password321')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
      cy.get('.message').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login/', {
        username: 'testuser1',
        password: 'password123'
      }).then(res => {
        localStorage.setItem('loggedInUser', JSON.stringify(res.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('A Unique Test Blog')
      cy.get('#author').type('Bill Clinton')
      cy.get('#url').type('https://auniquetestblog.test')
      cy.get('#createButton').click()

      cy.contains('A Unique Test Blog - Bill Clinton').contains('view')
    })

    describe('Once a blog is created', function() {
      beforeEach(function() {
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: {
            title: 'A Unique Test Blog',
            author: 'Bill Clinton',
            url: 'https://auniquetestblog.test'
          },
          headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
          }
        })
        cy.visit('http://localhost:3000')
      })

      it('The like button works', function() {
        cy.contains('A Unique Test Blog - Bill Clinton').contains('view').click()
        cy.contains('like').click()
        cy.contains('like').click()
        cy.contains('2')
      })

      it('The blog can be deleted', function() {
        cy.contains('A Unique Test Blog - Bill Clinton').contains('view').click()
        cy.contains('delete').click()
        cy.get('html').should('not.contain', 'Bill Clinton')
      })
    })
  })
})