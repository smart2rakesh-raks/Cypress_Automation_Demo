describe('Launch application', ()=>{
    beforeEach(() => {
        cy.visit('https://demo.nopcommerce.com/')})
        let randomText = ""
        let testEmail = ""
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
        randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'
    it('Register new user', ()=>{
        
        cy.title().should('eq','nopCommerce demo store')
        cy.contains('Register').click().url().should('include', '/register')
        cy.get('.master-wrapper-content').scrollIntoView()
        cy.get('[type="radio"]').first().check()
        cy.get('#FirstName').type("Raks")
        cy.get('#LastName').type("k")
        cy.get('.form-fields').within(()=>{
            cy.get('[name=DateOfBirthDay]').select('13')
            cy.get('[name=DateOfBirthMonth]').select('August')
            cy.get('[name=DateOfBirthYear]').select('1997')
        })
        cy.get('#Email').type(testEmail)
        cy.get('#Company').type('IBM')
        cy.get('.form-fields').within(()=>{
            cy.get('#Password').type('qwertyuiop')
            cy.get('#ConfirmPassword').type('qwertyuiop')
        })
        cy.get('#register-button').click()
        cy.get('.result').should('have.text', 'Your registration completed')
        cy.get('.buttons').click()

//        cy.get('.ico-login').contains('Log in').click().url().should('include','/login')
//        cy.login('raks.k@gmail.com', 'qwertyuiop')
        })

    it('Buy new product',()=>{
        cy.get('a[href*="/htc-one-m8-android-l-50-lollipop"]').contains('HTC One M8 Android L 5.0 Lollipop').scrollIntoView().click()
        cy.url().should('include', '/htc-one-m8-android-l-50-lollipop')
        cy.get('#add-to-cart-button-18').scrollIntoView().click()
        cy.get('#bar-notification').should('have.text', 'The product has been added to your shopping cart')
        cy.scrollTo('top')
        cy.get('#topcartlink').click().url().should('include', '/cart')
        cy.get('#termsofservice').click()
        cy.get('#checkout').click()
        cy.get('.master-wrapper-content').scrollIntoView()
        cy.login(testEmail, 'qwertyuiop')
        cy.get('#termsofservice').click()
        cy.get('#checkout').click()
        cy.get('#BillingNewAddress_CountryId').select('India')
        cy.get('#BillingNewAddress_City').type('Delhi')
        cy.get('#BillingNewAddress_Address1').type('Delhi')
        cy.get('#BillingNewAddress_ZipPostalCode').type('125050')
        cy.get('#BillingNewAddress_PhoneNumber').type('1234567890')
        cy.get('.buttons').contains('Continue').click()
        cy.get('#shipping-method-buttons-container').contains('Continue').click()
        cy.get('#payment-method-buttons-container').contains('Continue').click()
        cy.get('#payment-info-buttons-container').contains('Continue').click()
        cy.get('#confirm-order-buttons-container').contains('Confirm').click()
        cy.url().should('include','/checkout/completed')

    })

    it('Check If order is placed',()=>{

        cy.get('.ico-login').contains('Log in').click().url().should('include','/login')
        cy.login(testEmail, 'qwertyuiop')
        cy.contains('My account').click().url().should('include', '/customer/info')
        cy.get('.master-column-wrapper').contains('My account').click()
        cy.contains('Orders').click()
    })
}) 