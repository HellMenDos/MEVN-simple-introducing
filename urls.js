var urls = function(app,models,middalware) {
function randomString(i) {
    var rnd = '';
    while (rnd.length < i) 
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};

const transporter = require("./mail");






app.get("/api/confirm/:id",middalware.urlencodedParser, function(req,res) {
    models.User.findByIdAndUpdate({_id:req.params.id}, {data: "1"}, function(err, user){
        res.redirect("http://localhost:8080/account")
});
})

app.post("/api/registr",middalware.urlencodedParser, function(req, res){
    if(!req.body) return res.send(400);
	const email = req.body.email;
    models.User.findOne({email: email}, function(err, user){
	if(err) return res.send(err);
	
	if (user == null) {
     
    const user = new models.User({name: req.body.name, email: req.body.email ,password: req.body.password ,data:"0"});
    user.save(function(err){
     

        var mailData = {
            from: 'poznkirill4@gmail.com',  // sender address
            to: 'poznkirill3@gmail.com',   // list of receivers
            subject: 'Подтверждение аккаунта',
            html: `
            <h1>Cпасибо за регистрацию</h1>
            <p>Чтобы активировать аккаунт вы должны перейти по этой ссылке</p>
            <a href=http://localhost:3000/api/confirm/${user._id}>Подтвердить</a>
            `,
            };
            transporter.sendMail(mailData, function (err, info) {
            if(err)
            console.log(err)
            else
            console.log({status:'ok'});
            });
             res.send(user);
    });

    }else {
    	res.send({error: 1})
    }
    });


});
//registr

app.post("/api/login",middalware.urlencodedParser, function(req,res) {
	if(!req.body) return res.send(400);
	const email = req.body.email;
	const password = req.body.password;
    models.User.findOne({email: email}, function(err, user){
    	if(err) return res.send(err);
    	if (user == null) {
    		res.send({error:1})
    	}else {
    		models.User.findOne({email: email, password:password}, function(err, user){
    			if(err) return res.send(err);
    				if (user == null) {
    				res.send({error:2})
    				}else {
                        if (user.data == '1') {
                        res.send(user)
                        }else {
                        res.send({error:3})
                        }
    			}
    		})
    	}
    })
});
//login

app.post("/api/forgot",middalware.urlencodedParser,function(req,res) {
	 if(!req.body) return res.send(400);
	 const email = req.body.email;
	 models.User.findOne({email: email}, function(err, user){
	 	if(err) return res.send(err);
    	if (user == null) {
    		res.send({error:1})
    	}else {
    		password = randomString(6)
    		models.User.findOneAndUpdate({email: email}, {password:password}, function(err, user){
        	if(err) return res.send(err);

        	var mailData = {
			from: 'poznkirill4@gmail.com',  // sender address
  			to: email,   // list of receivers
  			subject: 'Изменение пароля',
 			html: "<h1>Мы получили запрос на изменения пароля</h1><h3>Ваш новый пароль: "+password+" </h3><p>После входа просьба поменяйте пароль<br>в личном кабинете, для сохранения безопастности </p>",
			};
			transporter.sendMail(mailData, function (err, info) {
   			if(err)
     		console.log({status:no})
   			else
     		console.log({status:ok});
			});

		});
            res.send('Ok')
    	}
	 })
})

app.post("/api/update",middalware.urlencodedParser, function(req,res) {
	if(!req.body) return res.send(400);
	const id = req.body.id
	const password = req.body.pass
    const newpass = req.body.newpass
	const email = req.body.email
	const name = req.body.name

	let newus = {}

	if (email != '') {
		newus.email = email
	}
	if (name != '') {
		newus.name = name
	}
	if (newpass != '') {
		newus.password = newpass
	}


	if (password == '') {
	models.User.findOneAndUpdate({_id: id},newus,function(err, user){
        if(err) return res.send(err); 
        res.send(user);
    });

	}else {
	models.User.findOneAndUpdate({_id: id,password},newus,function(err, user){
        if(err) return res.send(err); 
        if (user == null) {
        	 res.send({status:4});
        }else {
        	 res.send(user);
        }
       
    });
	}
});


//courses api
app.post("/api/addCourse",middalware.urlencodedParser,function(req,res) {
	const name = req.body.name
	const url = req.body.url
	const des = req.body.des
	const urlsFile = req.body.urlsFile
	const cost = req.body.cost

    models.Admin.findOne({name: req.body.nameAdmin ,password: req.body.passwordAdmin}, function(err, user){
	if(err) return console.log(err);
    if (user != null) { 
	const course = new models.Course({name: name, url: url,des:des,urlsFile:urlsFile,cost:cost});
        
    course.save(function(err){
        if(err) return console.log(err);
        res.redirect("/inneradmin")
    
    })
	}
    });

})

app.get("/api/AllCourses/:id",middalware.urlencodedParser, function(req,res) {
	 models.Course.find({_id:req.params.id}, function (err, user) {
       res.send(user)
    });
})

app.get("/api/AllCourses",middalware.urlencodedParser, function(req,res) {
     models.Course.find({}, function (err, user) {
       res.send(user)
    });
})

app.post("/api/deleteCourse",middalware.urlencodedParser, function(req,res) {
	const _id = req.body.id
	
	models.Admin.findOne({name: req.body.nameAdmin ,password: req.body.passwordAdmin}, function(err, user){
	if(err) return console.log(err);
    if (user != null) { 
    	models.Course.findByIdAndDelete(_id, function(err, user){
		if(err) return console.log(err);
        res.redirect("/inneradmin")
    });
    }
})
})




//ask questions
app.post("/api/ask",middalware.urlencodedParser,function(req,res) {
            var mailData = {
            from: 'poznkirill4@gmail.com',  // sender address
            to: 'poznkirill5@gmail.com',   // list of receivers
            subject: 'Задал вопрос',
            html: `<h1>Пользователь: ${req.body.email}</h1><p>${req.body.text}</p>`,
            };
            transporter.sendMail(mailData, function (err, info) {
            if(err)
            res.send({status:'no'})
            else
           res.send({status:'ok'});
            });
})


//auth admin
app.post("/api/adminAuth",middalware.urlencodedParser,function(req,res) {
	models.Admin.findOne({name: req.body.nameAdmin ,password: req.body.passwordAdmin}, function(err, user){
		res.cookie('user', user);
        if (user == null) {
            res.redirect("/adminAcc")
        }else {
            res.redirect("/inneradmin")
        }
    })
})


//admin of site 
app.get("/adminAcc/", function(req,res) {
	  res.render('admin')

})

app.get("/inneradmin/", function(req,res) {
models.Bought.find({}, function (err, buy) {
    models.User.find({}, function (err, user) {
        models.Course.find({}, function (err, course) {
            if (req.cookies.user == null) {
              res.redirect("adminAcc")
              }else {
               var data = {name: req.cookies.user.name,password:req.cookies.user.password,courses:course,users:user,bought:buy}
              }
            res.render('main_form',data)
             })
        })
    })
})




//bought section 
app.post("/api/buycourse",middalware.urlencodedParser,function(req,res) {
const buy = new models.Bought({ userId: req.body.userId, courseId: req.body.courseId ,first_param: req.body.first_param,Second_param: req.body.Second_param, })
buy.save(function(err){
   if(err) return res.send(err)
    res.send(buy)
 })

});

app.post("/api/checkers",middalware.urlencodedParser,function(req,res) {
    models.Bought.findOne({userId:req.body.userId,courseId:req.body.courseId,first_param: 1}, function(err,buy) {
    
        if (buy != null) {
             res.send({status:true, id: req.body.num})
        }else {
             res.send({status:false, id: req.body.num})
        }
    
    })
})
app.post("/api/checkersplus",middalware.urlencodedParser,function(req,res) {
    models.Bought.findOne({userId:req.body.userId,courseId:req.body.courseId,first_param: 1}, function(err,buy) {
        if (err) return res.send(err)
        models.Course.find({_id:buy.courseId} ,function(err2,course) {
        if (err2) return res.send(err2)
        if (buy != null) {
             res.send({status:true, id: req.body.num,buy:course})
        }else {
             res.send({status:false, id: req.body.num,buy:course})
        }
    })
    })
})
app.post("/api/allcorromuser",middalware.urlencodedParser, function(req,res) {
       models.Bought.find({userId:req.body.userId,first_param: 1}, function(err,buy) {
       res.send(buy)
    })
})

app.post("/api/allcorromuserS",middalware.urlencodedParser, function(req,res) {
       models.Course.find({_id:req.body.id}, function(err,course) {
       res.send(course)
    })
})
}
module.exports = urls








