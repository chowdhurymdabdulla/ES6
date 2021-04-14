
let chai = require('chai')
let chaiHttp = require('chai-http')
let expect = chai.expect

chai.use(chaiHttp)

describe('Testing Rest API',()=>{
    it('testing / route', () => {
        chai.request('mongodb://127.0.0.1:27017/edureka')
            .get('/')
            .then((results)=>{
                expect(results).to.have.status(200)              
            })
            .catch((err) => {
                throw(err)
            })
    })

    it('testing wrong /yyy route', () => {
        chai.request('http://localhost:7800/')
            .get('/yyy')
            .then((results)=>{
                expect(results).to.have.status(404)              
            })
            .catch((err) => {
                throw(err)
            })
    })
})