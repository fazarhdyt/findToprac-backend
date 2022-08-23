const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)

describe('API ENDPOINT TESTING', () => {
  it('GET LANDING Page', (done) => {
    chai.request(app).get('/api/v1/member/landing-page').end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res).to.be.an('Object')
      expect(res.body).to.have.property('item')
      done()
    })
  })
})