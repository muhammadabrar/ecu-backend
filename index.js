const express = require('express')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs');
var multer = require('multer')
// var zip = require('express-zip');
const fs = require("fs")
const AdmZip = require('adm-zip');
var uploadDir = fs.readdirSync("./public/files"); 
// const zip = new AdmZip();
//email config
var nodemailer = require('nodemailer');




const paypal = require('paypal-rest-sdk');



//prisma clients
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//initial app
const app = express()
const PORT = 8000

// use cors
var cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// inside public directory.
app.use('/images', express.static('images')); 
// use body-parser middleware
app.use(bodyParser.json());

// use cookieParser middleware
app.use(cookieParser());
// dates
var today = new Date()

var fulldate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

var date = today.getDate();
var day = today.getDay();

var month = today.getMonth();
var year = today.getFullYear();
var hours = today.getHours();
var AmOrPm = hours >= 12 ? 'PM' : 'AM';
hours = (hours % 12) || 12;
var min = today.getMinutes();
min = min<=9 ? '0'+min: min
var time = hours+' : '+min+ " " + AmOrPm; 


//middelware for auth
const auth = async (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (!token) {
    res.status(404).send("please login");
    
} else{
 console.log("auth run your are in")
      next();
    
}
};

//auth checking api
app.get('/verifyAuth', async (req, res) => {
  const token = await req.cookies.jwt;
  console.log("token: "+token)

  if (token) {
    const decodedToken = jwt.verify(token, '3e3jh3jhjkdhsjdh234rhrh34rhe45h234jhewhrj4h32ehrh')
    console.log("decodedToken: "+decodedToken)
    const user_id = decodedToken._id
    const user = await prisma.user.findFirst({
      where: {
        id : user_id
      },
      select:{
        id: true,
        name: true,
      }
    })

    res.json({user: user})
  } else {
    res.json({user : false})

  }
})

//create user
app.post('/user', auth, async (req, res) => {
  console.log(req.body)
  const data = req.body.data
  const name = data.name
  const email = data.email
  const pass = data.pass

  const passhash = await bcrypt.hash(pass, 10);

  console.log(passhash)
  const user = await prisma.user.create({

    data: {
      email: email,
      name: name,
      pass: passhash,
      status: true,
    },
  })
  res.json(user)
})

app.get('/users', auth, async (req, res) => {

  const user = await prisma.user.findMany()
  res.json({user: user})
})
app.delete('/user', auth, async (req, res) => {

  const user = await prisma.user.delete()
  res.json(user)
})
app.put('/user', auth, async (req, res) => {
const data = req.body.data
  const name = data.name
  const email = data.email
  const pass = data.pass

  const passhash = await bcrypt.hash(pass, 10);

  console.log(passhash)
  const user = await prisma.user.update({

    data: {
      email: email,
      name: name,
      pass: passhash,
      status: true,
    },
  })
  res.json(user)
})

//login api
app.post('/login', async (req, res) => {
  console.log(req.body)
  const data = req.body.data
  const email = data.email
  const pass = data.pass

  const getuser = await prisma.user.findFirst({
    where: {
      email: email
    }
  })
  if (getuser) {
    const comparePass = await bcrypt.compare(pass, getuser.pass);
    console.log(comparePass)
    if (!comparePass) {
      res.json({ err: "password" })
    } else {
      const token = jwt.sign({ _id: getuser.id }, "3e3jh3jhjkdhsjdh234rhrh34rhe45h234jhewhrj4h32ehrh");

        var mailOptions = {
          from: 'abrarmuhammad100@gmail.com',
          to: email,
          subject: 'Your Are Login TO Tested-ECU Solutions',
          text: 'Your Are Login TO Tested-ECU Solutions'
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      res.cookie("jwt", token, {
        httpOnly: true
      });
      res.cookie('cookieName', true);

      res.json({ msg: "login", user:  getuser.id})
    }
  } else {
    res.status(500)
  }


})


//logout api
app.get('/logout', async (req, res) => {
  res.clearCookie("jwt")
  res.json(logout = true)
})

//upload ecu files
app.post('/upload_ecufile', auth, function(req, res) {
  // console.log(file)
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/files')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

});
// add file api
app.post('/savefile', auth, async (req, res) => {
  console.log('runing  /savefile')
  
  //get req
  const data = req.body.data
  const make = data.make
  const model = data.model
  const engine = data.engine
  const power = data.power
  const hw = data.hw
  const sw = data.sw
  const ecu = data.ecu
  const price = data.price
  const size = data.size
  const fileName = data.fileName
  const Tool_read = data.Tool_read
  
//upsert model
  const upsertmodel = await prisma.model.upsert({
    where:{
      model: data.model
    },
    update: {
      model: data.model
    },
    create: {
      model: data.model
    },
  })
  //upsertmake
  const upsertmake = await prisma.make.upsert({
    where:{
      make: data.make
    },
    update: {
      make: data.make
    },
    create: {
      make: data.make
    },
  })
  //upsertengine
  const upsertengine = await prisma.engine.upsert({
    where:{
      engine: data.engine
    },
    update: {
      engine: data.engine
    },
    create: {
      engine: data.engine
    },
  })
  //createfile
  const createfile = await prisma.post.create({
    data: {
      make : make,
      model : model,
      engine : engine,
      power : power,
      hw : hw,
      sw : sw,
      ecu : ecu,
      price : Number(price),
      size : size,
      file : model+"_"+make+"_"+sw+"_"+fileName,
      Tool_read: Tool_read,
    },
  })
  if(!createfile){
    const success = false
    res.json(success)
  }else{
    const success = true
    res.json(success)
  }


})

app.get('/downloadfile/:name', async(req, res) => {
    const {name} = req.params
 const createfile = await prisma.post.findFirst({
   where:{
     id : name
   }
 })
    const zip = new AdmZip();

    zip.addLocalFile(`./public/files/${createfile.file}`);
 
    // Define zip file name
    const downloadName = `${name}.zip`;
 
    const data = zip.toBuffer();
 
    // save file zip in root directory
    // zip.writeZip(__dirname+"/"+downloadName);
    
    // code to download zip file
    console.log('runedee')
    res.set('Content-Type','application/octet-stream');
    res.set('Content-Disposition',`attachment; filename=${downloadName}`);
    res.set('Content-Length',data.length);
    res.send(data);
 
})
// add Editfile api
app.put('/updatefile/:id', auth, async (req, res) => {
  
  
  //get req
  const data = req.body.data
  const make = data.make
  const model = data.model
  const engine = data.engine
  const power = data.power
  const hw = data.hw
  const sw = data.sw
  const ecu = data.ecu
  const price = data.price
  const size = data.size
  const Tool_read = data.Tool_read
  const old_file = data.old_file
  const {id }= req.params

  console.log("api run")

  

  //updatefile
  const updatefile = await prisma.post.update({
    where:{
      id: id
    },
    data: {
      make : make,
      model : model,
      engine : engine,
      power : power,
      hw : hw,
      sw : sw,
      ecu : ecu,
      price : Number(price),
      size : size,
      Tool_read: Tool_read,
    },
  })
  if(!updatefile){
    const success = false
    res.json(success)
  }else{
    console.log("record edited")
    
    const success = true
    res.json(success)
  }


})
//file delete api
app.delete('/deletefile/:id', auth, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: id
    },
  })
  const pathToFile = "public/files/"+post.file
  fs.unlink(pathToFile, function(err) {
    if (err) {
      throw err
    } else {
      console.log("Successfully deleted the file.")
    }
  })
  res.json(post)
})

// getfilesinputoptions api
app.get('/filedatalist',  async (req, res) => {

  const model = await prisma.model.findMany()
  const make = await prisma.make.findMany()
  const engine = await prisma.engine.findMany()
  res.json({model: model, make: make, engine: engine})
})

// getfilesinputoptions api
app.get('/make',  async (req, res) => {
  const make = await prisma.make.findMany()
  res.json({make: make})
})

app.get('/model/:make',  async (req, res) => {
  const {make} = req.params
  console.log(make)
  const model = await prisma.post.groupBy({
    by: ['model'],
    where: {
      make: make
    },
  })
  res.json({model: model})
})
app.get('/engine/:make/:model',  async (req, res) => {
  const {make, model} = req.params
  console.log(make + ", " +model)
  const engine = await prisma.post.groupBy({
    by: ['engine'],
    where: {
      make: make,
      model: model
    },
  })
  console.log(engine)

  res.json({engine: engine})
})

// last added files api
app.get('/files', async (req, res) => {
  const data = await prisma.post.findMany({
    take: 10,
    orderBy: {
      id: "desc"
    }
  })
  
  res.json({data: data})
})
//get file by model/make/engine
app.get('/files/:make/:model/:engine', async (req, res) => {
  const {make, model, engine} = req.params
  console.log("get file by model/make/engine")
  const data = await prisma.post.findMany({
    where:{
      make: make,
      model: model,
      engine: engine
    },
    orderBy: {
      id: "desc"
    }
  })
  
  res.json({data: data})
})

// get files by id api
app.get('/file/:id',  async (req, res) => {
  const {id} = req.params
  const data = await prisma.post.findFirst({
    where:{
      id: id
    }
  })
  res.json({data: data})
})

// search  api
app.get('/search/:search',  async (req, res) => {
  const {search} = req.params

  const result = await prisma.post.findMany({
    where: {
      OR: [
        {
          hw: {
            contains: search,
          },
        },
        {
          sw: {
            contains: search,
          },
        },
      ],
    },
  })
  if (result.length>0){
    const err = false
  res.json({err: err, result: result})
    

  }else{
    const err = true
  res.json({err: err})
  }
})
// postmsg api
app.post('/postmsg',  async (req, res) => {
  console.log('runing  /msg')
  
  //get req
  const data = req.body.data
  const name = data.name
  const email = data.email
  const subject = data.subject
  const msg= data.msg


  //postmsg
  const postmsg = await prisma.msgs.create({
    data: {
      name : name   , 
      email : email  , 
      subject : subject, 
      msg : msg    , 
      month: month,   
      day  : day,   
      date : date,   
      year : year,   
      time : time,   
    },
  })
  if(!postmsg){
    const success = false
    res.json(success)
  }else{
    const success = true
    res.json(success)
  }


})
// get msgs api
app.get('/msgs/:displaydata', async (req, res) => {
  const {displaydata} = req.params
  

  switch(displaydata) {
    case 'today':
      // code block

      const todaydata  = await prisma.msgs.findMany({
        where:{
          month: month,   
          day  : day,   
          date : date,   
          year : year, 
        },
        orderBy: {
          id: "desc"
        }
      })
      
      res.json({data: todaydata})
      break;
    case 'month':
      // code block
      const monthdata = await prisma.msgs.findMany({
        where:{
          month: month,   
          year : year, 
        },
        orderBy: {
          id: "desc"
        }
      })
      res.json({data: monthdata})

      break;
      case 'all':
      // code block
      const alldata = await prisma.msgs.findMany({
        
        orderBy: {
          id: "desc"
        }
      })
      res.json({data: alldata})

      break;
    default:
      // code block
      const dedata = await prisma.msgs.findMany({
        where:{
          month: month,   
          day  : day,   
          date : date,   
          year : year, 
        },
        orderBy: {
          id: "desc"
        }
      })
      
      res.json({data: dedata})
  }
  
})

//get msg
app.get('/msg/:id',  async (req, res) => {
  const {id} = req.params
   //createfile
   const msg = await prisma.msgs.findFirst({
     where:{
       id: id
     }
   })
   if(msg){
     res.json({data: msg})
 
   }else{
     res.json("there are no data")
   }
 })
// add Tuningfile api
app.post('/savetuningfile', auth, async (req, res) => {
  console.log('runing  /savefile')
  
  //get req
  const data = req.body.data
  const title = data.title
  const cat = data.cat
  const price = data.price
 
  

  //upsertcat
  const upsertcat = await prisma.cat.upsert({
    where:{
      cat: data.cat
    },
    update: {
      cat: data.cat
    },
    create: {
      cat: data.cat
    },
  })
  //createfile
  const createfile = await prisma.tuningfiles.create({
    data: {
      cat_id : upsertcat.id,
      title : title,
      price: Number(price),
      
    },
  })
  if(!createfile){
    const success = false
    res.json(success)
  }else{
    const success = true
    res.json(success)
  }
})
// getcats api
app.get('/getcats',  async (req, res) => {
  
  const cat = await prisma.cat.findMany()
  const tuningfiles = await prisma.tuningfiles.findMany()
  const firsttuningfiles = await tuningfiles.filter(tuningfile => tuningfile.cat_id == cat[0].id)

  res.json({cat: cat, tuningfiles: tuningfiles, firsttuningfiles: firsttuningfiles})
})
// gettuningfile api
app.get('/gettuningfile/:id',  async (req, res) => {
  const {id} = req.params
  const tuningfile = await prisma.tuningfiles.findFirst({
    where:{
      id : id
    },
    select:{
      cat:{
        select:{
          cat:true
        }
      },
      title: true,
      price: true
    }
  })
  
  res.json({tuningfile: tuningfile})
})
//edit tuning file
app.put('/edittuningfile/:id',  async (req, res) => {
  const {id} = req.params
  //get req
  const data = req.body.data
  const title = data.title
  const cat = data.cat
  const price = data.price
 
  

  //upsertcat
  const upsertcat = await prisma.cat.upsert({
    where:{
      cat: data.cat
    },
    update: {
      cat: data.cat
    },
    create: {
      cat: data.cat
    },
  })
  //createfile
  const updatefile = await prisma.tuningfiles.update({
    where:{
      id: id
    },
    data: {
      cat_id : upsertcat.id,
      title : title,
      price: Number(price),
      
    },
  })
  if(!updatefile){
    const success = false
    res.json(success)
  }else{
    const success = true
    res.json(success)
  }
})
// get about api
app.get('/about/',  async (req, res) => {
  const about = await prisma.about.findFirst()
  if(about){
    res.json({about: about})

  }else{
    res.json("there are no data")
  }
})
//upload about image
app.post('/upload_aboutimage', auth, function(req, res) {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

});
//edit about file
app.put('/about/:id',  async (req, res) => {
  const {id} = req.params
  //get req
  const data = req.body.data
  const title = data.title
  const p = data.p
  const p2 = data.p2
  const image = data.image
 
  

  
  //createfile
  const updatefile = await prisma.about.update({
    where:{
      id: id
    },
    data: {
      p : p,
      title : title,
      p2: p2,
      image: image,
    },
  })
  if(!updatefile){
    const success = false
    res.json(success)
  }else{
    const success = true
    res.json(success)
  }
})
// get about api
app.get('/contact/',  async (req, res) => {
  const contact = await prisma.contact.findFirst()
  if(contact){
    res.json({contact: contact})

  }else{
    res.json("there are no data")
  }
})

//edit contacts file
app.put('/contact/:id',  async (req, res) => {
  const {id} = req.params
  //get req
  const data = req.body.data
  const f = data.f
  const w = data.w
  const e = data.e
  const i = data.i
  const t = data.t

 
  

  
  //createfile
  const updatefile = await prisma.contact.update({
    where:{
      id: id
    },
    data: {
      email: e,
      facebook: f,
      insta: i,
      whatsapp: w,
      tweeter: t,
    },
  })
  if(!updatefile){
    const success = false
    res.json(success)
  }else{
    const success = true
    res.json(success)
  }
})
//delete tuning file
app.delete('/edittuningfile/:id', auth, async (req, res) => {
  const { id } = req.params
  const file = await prisma.tuningfiles.delete({
    where: {
      id: id
    },
    
  })
  res.json(file)
})

// get faq api
app.get('/faq/',  async (req, res) => {
  const data = await prisma.faq.findMany()
  if(data){
    res.json({data: data})

  }else{
    res.json("there are no data")
  }
})

// post faq api
app.post('/faq/', auth,  async (req, res) => {
  //get req
  const data = req.body.data
  const Q = data.Q
  const p = data.p

  //createfile
  const addfaq = await prisma.faq.create({
    data: {
      Q : Q,
      p: p,
      
    },
  })
  if(!addfaq){
    const success = false
    res.json(success)
  }else{
    const success = true
    res.json(success)
  }
})

//faq delete api
app.delete('/faq/:id', async (req, res) => {
  const { id } = req.params
  const faq = await prisma.faq.delete({
    where: {
      id: id
    },
    
  })
  res.json(faq)
})

// post feedback api
app.post('/feedback/',  async (req, res) => {
  //get req
  const data = req.body.data
  const name = data.name
  const company = data.company
  const feedback = data.feedback
  const stars = data.stars


  //createfile
  const addfeedback = await prisma.feedback.create({
    data: {
      name : name,
      company : company,
      feedback : feedback,
      stars : stars,
      
    },
  })
  if(!addfeedback){
    const success = false
    res.json(success)
  }else{
    const success = true
    res.json(success)
  }
})

// get all feedback api
app.get('/feedback/',  async (req, res) => {
  
  //createfile
  const data = await prisma.feedback.findMany({
    orderBy: {
      id: "desc"
    }
  })
  if(data){
    res.json({data: data})

  }else{
    res.json("there are no data")
  }
})
// get 2 feedback api
app.get('/feedback/:limit',  async (req, res) => {
  const {limit} = req.params
  //createfile
  const data = await prisma.feedback.findMany({
    orderBy: {
      id: "desc"
    },
    take: Number(limit)
    
    
  })
  if(data){
    res.json({data: data})

  }else{
    res.json("there are no data")
  }
})

// post visiters api
app.put('/visiters/:ip',  async (req, res) => {
  //get req
var today = new Date()

  const {ip} = req.params
  var date = today.getDate();
  var day = today.getDay();
  var month = today.getMonth()
  var year = today.getFullYear()
 
  

  //upsertcat
  const upsertvisiter = await prisma.visiter.upsert({
    where:{
      ip: ip
    },
    update: {
      ip: ip,
      month : month,
      day : day,
      date : date,
      year : year,
    },
    create: {
      ip: ip,
      month : month,
      day : day,
      date : date,
      year : year,
    },
  })
  
  if(!upsertvisiter){
    const success = false
    res.json(success)
  }else{
    const success = true
    res.json(success)
  }
})

//get visiters graph
app.get('/visiter/:time',  async (req, res) => {
  const {time} = req.params

  //createfile
  switch (time){
    case 'This Week':
      const week = await prisma.visiter.groupBy({
        by: ['date'],
        where: {
          month:month,
          year: year
        },
        orderBy: {
          date: 'desc',
        },
        _count: {
          date: true,
        },
        take: 7,
      })
    res.json({data: week})
      break
    case 'This Month':
      const Month = await prisma.visiter.groupBy({
        by: ['date'],
        where: {
          month:month,
          year: year
        },
        orderBy: {
          date: 'desc',
        },
        _count: {
          date: true,
        },
      })
    res.json({data: Month})
      break
    case 'This Year':
      const Year = await prisma.visiter.groupBy({
        by: ['date'],
        where: {
          year: year
        },
        orderBy: {
          date: 'desc',
        },
        _count: {
          date: true,
        },
      })
    res.json({data: Year})
      break
  }
 })
//get visiter state
app.get('/visiterState/:time',  async (req, res) => {
  const {time} = req.params
   //createfile
   switch (time){
     case 'Today':
      const today = await prisma.visiter.count({
        where: {
          date: date,
          month:month,
          year: year
        },
      })
     res.json({data: today})
       break
     case 'This month':
      const thismonth = await prisma.visiter.count({
        where: {
          month:month,
          year: year
        },
      })
     res.json({data: thismonth})
       break
     case 'All time':
      const all = await prisma.visiter.count()
     res.json({data: all})
       break
   }
 })

 //get visiter state
app.get('/earnState/:time', auth, async (req, res) => {
  const {time} = req.params
   //createfile
   switch (time){
     case 'Today':
      const today = await prisma.earn.aggregate({
        where: {
          date: date,
          month:month,
          year: year
        },
        _sum:{
          earn: true
        }
      })
     res.json({data: today})
       break
     case 'This month':
      const thismonth = await prisma.earn.aggregate({
        where: {
          month:month,
          year: year
        },
        
        _sum:{
          earn: true
        }
      })
     res.json({data: thismonth})
       break
     case 'All time':
      const all = await prisma.earn.aggregate({
        _sum:{
          earn: true
        }
      })
     res.json({data: all})
       break
   }
 })

 //get file state
 app.get('/fileState/:time', auth, async (req, res) => {
  const {time} = req.params
   //createfile
   switch (time){
     case 'Today':
      const today = await prisma.soldfile.count({
        where: {
          date: date,
          month:month,
          year: year
        },
      })
     res.json({data: today})
       break
     case 'This month':
      const thismonth = await prisma.soldfile.count({
        where: {
          month:month,
          year: year
        },
      })
     res.json({data: thismonth})
       break
     case 'All time':
      const all = await prisma.soldfile.count()
     res.json({data: all})
       break
   }
 })

 //get file pending ordersstates
 app.get('/orderState', auth,  async (req, res) => {
  const data = await prisma.orders.count({
  where: {
    status: false
  },
})
res.json({data: data})
 })

 //get earning graph
app.get('/earning/:time', auth, async (req, res) => {
  const {time} = req.params

  //createfile
  switch (time){
    case 'This Week':
      const week = await prisma.earn.groupBy({
        by: ['date'],
        where: {
          month:month,
          year: year
        },
        orderBy: {
          date: 'desc',
        },
        _sum: {
          earn: true,
        },
        take: 7,
      })
    res.json({data: week})
      break
    case 'This Month':
      const Month = await prisma.earn.groupBy({
        by: ['date'],
        where: {
          month:month,
          year: year
        },
        orderBy: {
          date: 'desc',
        },
        _sum: {
          earn: true,
        },
      })
    res.json({data: Month})
      break
    case 'This Year':
      const Year = await prisma.earn.groupBy({
        by: ['date'],
        where: {
          year: year
        },
        orderBy: {
          date: 'desc',
        },
        _sum: {
          earn: true,
        },
      })
    res.json({data: Year})
      break
  }
 })

 //get orders
 app.get('/orders/:status', auth,  async (req, res) => {
  const {status} = req.params
  console.log(status)
  if(status == 'Done'){
    const orders = await prisma.orders.findMany({
      where: {
        status : true
      },
    })
  res.json({data: orders})
  }else{
     const orders = await prisma.orders.findMany({
      where: {
        status : false
      },
      orderBy:{
        id : 'desc'
      }
    })
  res.json({data: orders})
  }
   })

 //get OrderDetail
 app.get('/OrderDetail/:id', auth,  async (req, res) => {
  const {id} = req.params
    const orders = await prisma.orders.findMany({
      where: {
        id : id
      },
      select:{
        name: true,
        id: true,
        des : true,
        email : true,
        file1 : true,
        file2 : true,
        price : true,
        status : true,
        paid : true,
        month : true,
        day : true,
        date : true,
        year : true,
        time : true,
        ordersID:{
          select:{
            tuningfile:{
              select:{
                title : true,
                price : true,
                cat:{
                  select:{
                    cat: true
                  }
                }
              }
            }
          }
        }
      }
    })
  res.json({data: orders})
   })

 //get file pay and download
 app.get('/download/:id',  async (req, res) => {
  const {id} = req.params
  const file = await prisma.post.findFirst({
    where: {
      id : id,
    },
  })
  
    
    if(file){
     const soldfile = await prisma.soldfile.create({
      data: {
        file_id : id,
        buyer: 'buyer',
        amount: Number(file.price),
        month : month,
        day : day,
        date : date,
        year : year,
      },
    })
    res.cookie("download", soldfile.id, {
      expires: new Date(Date.now() + 60*60*1000),
      httpOnly: true
    });
    console.log('soldfile')
    console.log(soldfile) 
    res.redirect(`zipfiles/${file.file}/${soldfile.id}`)

      
    }else{
      res.json('there are no such file')
    }
    
   })

   app.get('/download/zipfiles/:file/:id',  async (req, res) => {
    const {file} = req.params
    const {id} = req.params
    const cookies_download = req.cookies.download;
    if(cookies_download == id){
      const soldfile = await prisma.soldfile.findFirst({
        where: {
          id : id,
        },
      })
      if(!soldfile.download){
        const update = await prisma.soldfile.update({
          where: {
            id : id,
          },
          data: {
            download: true,
          },
        })
        
    }
    
    zip.addLocalFile(`./public/files/${file}`);
 
    // Define zip file name
    const downloadName = `${file}.zip`;
 
    const data = zip.toBuffer();
 
    // save file zip in root directory
    // zip.writeZip(__dirname+"/"+downloadName);
    
    // code to download zip file
    res.set('Content-Type','application/octet-stream');
    res.set('Content-Disposition',`attachment; filename=${downloadName}`);
    res.set('Content-Length',data.length);
    res.send(data)
    }else{
      res.json('sorry yo already downloaded this file')
    }
    
   })







//upload_tuningfile
app.post('/upload_tuningfile',function(req, res) {
  // console.log(file)
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/tuningfiles')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

});


// add file api
app.post('/sendOrder',  async (req, res) => {
  console.log('runing  /tunungfile')
  
  //get req
  const data = req.body.data
  const name = data.name
  const des = data.des
  const email = data.email
  const file = fulldate +"_"+ name+ data.fileName
  const size = data.size
  const price = data.price
  const tuningfiles = data.tuningfiles
  console.log(tuningfiles)
  let tuningfilesId = [] //---------
        for (let i = 0; i < tuningfiles.length; i++) {
          tuningfilesId.push({ tuningfile_id: tuningfiles[i].id})
        }
  //createfile
  const order = await prisma.orders.create({
    data: {
      name ,
      des ,
      email ,
      file1 : file ,
      file2 : size,
      price ,
      month ,
      day ,
      date ,
      year ,
      time ,
      ordersID:{
        create: tuningfilesId
      }
    },
  })
  if(!order){
    const success = false
    res.json(success)
  }else{
    const success = true
    res.json({order: order})
  }


})
//edit tuning file
app.put('/UpdateOrder/:id',  async (req, res) => {
  const {id} = req.params
  //get req
  
  //createfile
  const orders = await prisma.orders.update({
    where:{
      id: id
    },
    data: {
      status : true,
      
    },
  })
  if(!orders){
    const success = false
    res.json(success)
  }else{
    const success = true
    res.json(success)
  }
})
  app.get('/downloadorder/:file/',  async (req, res) => {
    const {file} = req.params
   
    const zip = new AdmZip();
    
    zip.addLocalFile(`./public/tuningfiles/${file}`);
 
    // Define zip file name
    const downloadName = `${file}.zip`;
 
    const data = zip.toBuffer();
 
    // save file zip in root directory
    // zip.writeZip(__dirname+"/"+downloadName);
    
    // code to download zip file
    res.set('Content-Type','application/octet-stream');
    res.set('Content-Disposition',`attachment; filename=${downloadName}`);
    res.set('Content-Length',data.length);
    res.send(data)
    
   })

// pay order
app.get('/pay/:id', async (req, res) => {
  const {id} = req.params
  const order = await prisma.orders.update({
        where: {
          id: id
        },
        data:{
        paid: true
        }
  })
  if(!order){
    const success = false
    res.json({success: success})
  }else{
    var mailOptions = {
      from: 'abrarmuhammad100@gmail.com',
      to: order.email,
      subject: 'Tuning File',
      text: 'Your order has been submited. you will get your file as soon as possible. Thank you your order Id' + order.id + 'if you never get your order then send your Id on this email or contact us direct from website. Thank You'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    const success = true
    res.json({success: success})
  }
})

app.delete('/deleteorder/:id', auth, async (req, res) => {
  const { id } = req.params
  const ordersid = await prisma.ordersID.delete({
    where: {
      order_id: id
    },
  })
  const order = await prisma.orders.delete({
    where: {
      id: id
    },
  })
  const pathToFile = "public/tuningfiles/"+order.file1
  fs.unlink(pathToFile, function(err) {
    if (err) {
      throw err
    } else {
      console.log("Successfully deleted the file.")
    }
  })
  res.json(orders)
})


//user update
app.get('/sendtoken/:id',  async (req, res) => {
  const {id} = req.params
  //get req
  const otp = Math.floor(Math.random() * 10000) + 1;
  //createfile
  const user = await prisma.user.update({
    where:{
      id: id
    },
    data:{
      token : String(otp),
      status: false
    }
  })

  if(!user){
    const success = false
    res.json({success: success})
  }else{
    var mailOptions = {
      from: 'abrarmuhammad100@gmail.com',
      to: user.email,
      subject: 'Account verification',
      text: 'Your OTP is ' + otp
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.json({success:true, user: user})
  }
})

app.put('/tokenverification/:id',  async (req, res) => {
  const {id} = req.params
  //get req
  const data = req.body.data
  const token = data.token
  //createfile
  const user = await prisma.user.findFirst({
    where:{
      id: id
    },
  })

  if (user.token == token){
    const updateuser = await prisma.user.update({
      where:{
        id: id
      },
      data:{
        status: true
      }
    })
    res.json({success: true})
  }else{
    res.json({success: false})
  }
})
//change pass
app.put('/changepass/:id',  async (req, res) => {
  const {id} = req.params
  //get req
  const data = req.body.data
  const pass = data.pass
  const passhash = await bcrypt.hash(pass, 10);
  //createfile

  const user = await prisma.user.update({
    where:{
      id: id,
      status: true
    },
    data: {
      pass: passhash
    }
  })

  if (user){
    
    res.json({success: true})
  }else{
    res.json({success: false})
  }
})

app.delete('/deleteUser/:id',  async (req, res) => {
  const {id} = req.params
  //get req

  //createfile
  const user = await prisma.user.delete({
    where:{
      id: id
    },
  })

  if (user){
    
    res.json({success: true})
  }else{
    res.json({success: false})
  }
})

app.get('/testzip/:name', (req, res) => {
    const {name} = req.params
 
    const zip = new AdmZip();

    zip.addLocalFile(__dirname+"/public/files/SMS.pdf");
 
    // Define zip file name
    const downloadName = `${name}.zip`;
 
    const data = zip.toBuffer();
 
    // save file zip in root directory
    // zip.writeZip(__dirname+"/"+downloadName);
    
    // code to download zip file
    console.log('runedee')
    res.set('Content-Type','application/octet-stream');
    res.set('Content-Disposition',`attachment; filename=${downloadName}`);
    res.set('Content-Length',data.length);
    res.json({download: 'done'});
 
})
// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});

