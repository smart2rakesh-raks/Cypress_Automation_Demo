/// <reference types="Cypress" />
const dataJson = require('../../fixtures/createuser')

describe('API Automation', () => {
let accessToken = '007526d9efdbc07e084ff7a6d4cfcc90588fbe20641c00faebf45a7f3b2eaf33'
let randomText = ""
let testEmail = ""
let userid = ""
var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
for (var i = 0; i < 10; i++)
randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
testEmail = randomText + '@gmail.com'

    it('create new user', () => {
        
        cy.fixture('createuser').then((body) =>{
            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {'Authorization': 'Bearer ' + accessToken},
                body: {
                    "name": body.name,
                    "gender": body.gender,
                    "email": testEmail,
                    "status":body.status
                }
            }).then((res)=>{
                expect(res.status).to.eq(201)
            }).then((res) =>{
                   const userId = res.body.data.id
                   userid = res.body.data.id
                    cy.log("user id is: " + userId)
                })
        })
    })
    it('Get new created user', ()=>{
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public-api/users/'+userid,
            headers: {'authorization': 'Bearer '+ accessToken}
            }).then((res)=>{
            expect(res.status).to.eq(200)
        })    
    })  

    it('Update new created user data', ()=>{

        cy.request({
            method: 'PUT',
            url: 'https://gorest.co.in/public/v1/users/'+userid,
            headers: {'Authorization': 'Bearer ' + accessToken },
            body: {
                "name":"Raks",
                "gender":"male",
                "email": testEmail,
                "status":"inactive"
            }

        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.data).has.property('email', testEmail)
            expect(res.body.data).has.property('name','Raks')

        })
    })

    it('Delete new created user', ()=>{
        cy.request({
            method: 'DELETE',
            url: 'https://gorest.co.in/public/v1/users/'+userid,
            headers: {'Authorization': 'Bearer ' + accessToken}
        }).then((res)=>{
            expect(res.status).to.eq(204)
        })
    })
    
})