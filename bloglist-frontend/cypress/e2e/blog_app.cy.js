describe('Blog app', function() {
  beforeEach(function() {
    // Empty the database
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    // Create a new users
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    const anotherUser = {
      name: 'Another User',
      username: 'anotheruser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users', anotherUser)

    // Visit the application
    cy.visit('http://localhost:3001')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
    cy.get('#username').type('testuser')
    cy.get('#password').type('testpassword')
    cy.get('#login-button').click()

    cy.contains('Test User logged in')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
  
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Test User logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
    })

    describe('blog actions', function() {
      beforeEach(function() {
        cy.contains('create new blog').click()
        cy.get('#blog-title-input').type('a blog created by cypress')
        cy.get('#blog-author-input').type('cypress student')
        cy.get('#blog-url-input').type('blog.with.cypress')
        cy.get('#create').click()
      })

      it('user can create blog', function() {
        cy.contains('a blog created by cypress')
      })
  
      it('user can like blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
      })

      it('user can delete blog', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
      })

      it('another user can log in', function() {
        cy.contains('logout').click()
        cy.get('#username').type('anotheruser')
        cy.get('#password').type('testpassword')
        cy.get('#login-button').click()
        cy.contains('Another User logged in')
      })

      it('another user can not delete blog', function() {
        cy.contains('logout').click()
        cy.get('#username').type('anotheruser')
        cy.get('#password').type('testpassword')
        cy.get('#login-button').click()
        cy.contains('Another User logged in')
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })

      it('check that blogs are ordered by likes', function() {
        cy.contains('create new blog').click()
        cy.get('#blog-title-input').type('another blog should listed first')
        cy.get('#blog-author-input').type('cypress student')
        cy.get('#blog-url-input').type('another.blog.with.cypress')
        cy.get('#create').click()
        cy.get('.blog').eq(1).contains('view').click()
        cy.get('.blog').eq(1).contains('like').click()
        cy.get('.blog').eq(0).contains('another blog should listed first')
      })
    })
  })
})
