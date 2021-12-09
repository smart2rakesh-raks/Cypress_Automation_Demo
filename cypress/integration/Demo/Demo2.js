
describe('Launch application', ()=>{
    beforeEach(() => {
        cy.visit('http://automationpractice.com/')})
        
    it('Register new user', ()=>{
        cy.title().should('eq','My Store')
        cy.get('.header_user_info').contains('Sign in').click()
        cy.get('#email_create').type('raks.k@gmail.com')
        cy.get('#SubmitCreate').click({ force: true })
        if(cy.get('#create_account_error').contains('An account using this email address has already been registered. Please enter a valid password or request a new one.'))
        {
            cy.get('#email').type('raks.k@gmail.com')
            cy.get('#passwd').type('qwertyuiop')
            cy.get('#SubmitLogin').click()
        }
        else{
            cy.get('#id_gender1').click()
            cy.get('#customer_firstname').type("Raks")
            cy.get('#customer_lastname').type("k")
            cy.get('#passwd').type('qwertyuiop')
            cy.get('.form-group').within(()=>{
                cy.get('#days').select('13')
                cy.get('#months').select('August')
                cy.get('#years').select('1997')
            })
            cy.get('#company').type('IBM')
            cy.get('#address1').type('delhi')
            cy.get('#city').type('sirsa')
            cy.get('#id_state').select('Hawaii')
            cy.get('#postcode').type('12505')
            cy.get('#phone_mobile').type('1234567890')
            cy.get('#alias').type('rk@gmail.com')
            cy.get('#submitAccount').click()
        }
        })

    it('Buy new product',()=>{
        cy.get('#block_top_menu').within(()=>{
            cy.contains('T-shirts').click({force: true})
        })
        cy.get('.button-container').contains('Add to cart').click()
        cy.get('.button-container').contains('Proceed to checkout').click()
        cy.get('a[href*="http://automationpractice.com/index.php?controller=order&step=1"]').contains('Proceed to checkout').click()
        cy.get('#email').type('raks.k@gmail.com')
        cy.get('#passwd').type('qwertyuiop')
        cy.get('#SubmitLogin').click()
        cy.get('button[name="processAddress"]').contains('Proceed to checkout').click()
        cy.get('#cgv').click()
        cy.get('button[name="processCarrier"]').contains('Proceed to checkout').click()
        cy.get('a[href*="http://automationpractice.com/index.php?fc=module&module=bankwire&controller=payment"]').contains('Pay by bank wire ').click()
        cy.contains('I confirm my order').click()
        cy.contains('I confirm my order').click()

        })

    it('Check If order is placed',()=>{

        cy.get('.login').contains('Sign in').click()
        cy.get('#email').type('raks.k@gmail.com')
        cy.get('#passwd').type('qwertyuiop')
        cy.get('#SubmitLogin').click()
        cy.get('.icon-list-ol').click()
    })
}) 