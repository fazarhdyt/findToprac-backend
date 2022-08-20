const seeder = require('mongoose-seed');
const mongoose = require('mongoose');

//connect to mongodb
seeder.connect('mongodb://localhost:27017/findToprac', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}, function(){

  //load mongoose models
  seeder.loadModels([
    './models/Image',
    './models/Ketoprak',
    './models/Users',
  ]);

  //clear specified collections
  seeder.clearModels(['Image', 'Ketoprak', 'Users', function(){
    //callback to populate DB once collection have been cleared
    seeder.populateModels(data, function(){
      seeder.disconnect();
    });
  }]);
});

var data = [
  {
    'model': 'Users',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903345'),
        username: 'admin',
        password: 'admin'
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903346'),
        username: 'superadmin',
        password: 'ketoprac',
        role: 'admin'
      }
    ]
  }
]