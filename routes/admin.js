const router = require('express').Router()
const adminController = require('../controllers/adminController')
const {uploadSingle, uploadMultiple} = require('../middlewares/multer')
const auth = require('../middlewares/auth')

router.get('/signin', adminController.viewSignin)
router.post('/signin', adminController.actionSignin)
router.use(auth)
router.get('/logout', adminController.actionLogout)
router.get('/dashboard', adminController.viewDashboard)
//endpoint item ketoprac
router.get('/ketoprac', adminController.viewKetoprac)
router.post('/ketoprac',uploadSingle, adminController.addKetoprac)
router.put('/ketoprac', uploadSingle ,adminController.editKetoprac)
router.delete('/ketoprac/:id', adminController.deleteKetoprac)
module.exports = router