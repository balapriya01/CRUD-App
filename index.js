const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/users");
const PORT = 3000;

//Ejs
app.set("view engine", "ejs");

//Readable format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//To access public files
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/show", async (req, res) => {
  const users = await userModel.find();
  res.render("show", { users });
});

app.post("/create", async (req, res) => {
  const { name, email, imgurl } = req.body;
  await userModel.create({
    name,
    email,
    imgurl,
  });
  res.redirect("/show");
});

app.get("/create" , async (req, res) => {
    res.render('index')
})

app.get("/delete/:id", async (req, res) => {
  await userModel.findOneAndDelete({
    _id: req.params.id,
  });
  res.redirect("/show");
});

app.get('/edit/:userid', async (req, res) => {
  const user = await userModel.findOne({_id:req.params.userid});
  res.render('edit', {user});
})

app.post('/update/:userid', async (req, res) => {
  const {name, email, imgurl} = req.body;
  await userModel.findOneAndUpdate({_id:req.params.userid}, {name, email, imgurl}, {new:true});
  res.redirect('/show');
})

app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
