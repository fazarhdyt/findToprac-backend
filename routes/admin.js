const router = require('express').Router()
const adminController = require('../controllers/adminController')
const auth = require('../middlewares/auth')

router.get('/signin', adminController.viewSignin)
router.post('/signin', adminController.actionSignin)
router.get('/logout', adminController.actionLogout)
router.get('/dashboard', adminController.viewDashboard)
//endpoint item ketoprac
router.get('/ketoprac', adminController.viewKetoprac)
router.post('/ketoprac', adminController.addKetoprac)
router.put('/ketoprac', adminController.editKetoprac)
router.delete('/ketoprac/:id', adminController.deleteKetoprac)
module.exports = router