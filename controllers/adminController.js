const Ketoprac = require('../models/Ketoprac');
const Users = require('../models/Users');
const path = require('path')

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')
      const alert = {message: alertMessage, status: alertStatus}
      if(req.session.user == null || req.session.user == undefined){
        res.render('index', {
          alert,
          title: 'FindToprac | Login'
        });
      } else {
        res.redirect('/admin/dasboard')
      }
    } catch (error) {
      res.redirect('/admin/signin')
    }
  },

  actionSignin: async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await Users.findOne({username: username})
        if(!user){
            req.flash('alertMessage', 'User yang ada masukkan tidak ada!')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/signin')
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            req.flash('alertMessage', 'Password yang ada masukkan tidak cocok!')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/signin')
        }
        req.session.user = {
            id: user.id,
            username: user.username
        }
        res.redirect('/admin/dashboard')
    } catch (error) {
        res.redirect('/admin/signin')
    }
},

actionLogout: (req, res) => {
    req.session.destroy()
    res.redirect('/admin/signin')
},

viewDashboard: async (req, res) => {
    try {
        res.render('admin/dashboard/view_dashboard', {
            title: 'FindToprac | Dashboard',
            user: req.session.user,
        }) 
    } catch (error) {
        res.redirect('/admin/dashboard')
    }
},

viewKetoprac: async (req, res) => {
  try {
      const ketoprac = await Ketoprac.find()
      const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')
      const alert = {message: alertMessage, status: alertStatus}
      res.render('admin/ketoprac/view_ketoprac', {
          title: 'Ketoprac | Item',
          alert,
          ketoprac,
          user: req.session.user
      })
  } catch (error) {
      req.flash('alertStatus', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/admin/ketoprac')
  }
},

addKetoprac: async (req, res) => {
  try {
      const {name, address, city, gmaps, price, description} = req.body
      await Ketoprac.create({
          name,
          address,
          city,
          gmaps,
          price,
          description,
          imageUrl: `images/${req.file.filename}`
      })
      req.flash('alertMessage', 'Success add ketoprac')
      req.flash('alertStatus', 'success')
      res.redirect('/admin/ketoprac')
  } catch (error) {
      req.flash('alertStatus', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/admin/ketoprac')
  }
},

editKetoprac: async (req, res) => {
  try {
      const {id, name, address, city, gmaps, price, description} = req.body
      const ketoprac = await Ketoprac.findOne({_id: id})
      if(req.file == undefined) {
          ketoprac.name = name
          ketoprac.address = address
          ketoprac.city = city
          ketoprac.gmaps = gmaps
          ketoprac.price = price
          ketoprac.description = description
          await ketoprac.save()
          req.flash('alertMessage', 'Success update ketoprac')
          req.flash('alertStatus', 'success')
          res.redirect('/admin/ketoprac')     
      } else {
          await fs.unlink(path.join(`public/${ketoprac.imageUrl}`))
          ketoprac.name = name
          ketoprac.address = address
          ketoprac.city = city
          ketoprac.gmaps = gmaps
          ketoprac.price = price
          ketoprac.description = description
          bank.imageUrl = `images/${req.file.filename}`
          await bank.save()
          req.flash('alertMessage', 'Success update ketoprac')
          req.flash('alertStatus', 'success')
          res.redirect('/admin/ketoprac')
      }
      
  } catch (error) {
      req.flash('alertStatus', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/admin/ketoprac')
  }
},

deleteKetoprac : async (req, res) => {
  try {
      const {id} = req.params
      const ketoprac = await Ketoprac.findOne({_id: id})
      await fs.unlink(path.join(`public/${ketoprac.imageUrl}`))
      await ketoprac.remove()
      req.flash('alertMessage', 'Success delete ketoprac')
      req.flash('alertStatus', 'success')
      res.redirect('/admin/ketoprac')
  } catch (error) {
      req.flash('alertStatus', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/admin/ketoprac')
  }
},
}