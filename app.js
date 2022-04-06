const express = require("express")
const app = express()
var bodyParser = require("body-parser")
const mongoose = require('mongoose');
main().catch(err => console.log(err));

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

async function main() {
  await mongoose.connect('mongodb://localhost:27017/todolistDB');

  const itemschema = new mongoose.Schema({
    name: String
  });

  const Item = mongoose.model("Item", itemschema)

  const item1 = new Item({
    name: "omkar"
  })
  const item2 = new Item({
    name: "harry"
  })
  const item3 = new Item({
    name: "peter"
  })



  const defaultitems = [item1, item2, item3]



  app.get("/", function(req, res) {

    Item.find({}, function(err, founditems) {
      if (founditems.length === 0) {
        Item.insertMany(defaultitems, function(err) {
          if (err) {
            console.log(err)
          } else {
            console.log("u r connected")
          }
        })

        res.redirect("/")
      } else {
        res.render("list", {
          listtitle: "Today",
          newlistitems: founditems
        })

      }


    })



  })

  app.post("/", function(req, res) {
    let itemName = req.body.newitem
    const item=new Item({
      name:itemName
    })
 item.save()
 res.redirect("/")
  })


  app.get("/work", function(req, res) {
    res.render("list", {
      listtitle: "work list",
      newlistitems: workitems
    })
  })
  app.post("/work", function(req, res) {

    let workitem = req.body.newitem
    workitems.push(workitem)
    res.redirect("/")
  })

  app.get("/about", function(req, res) {
    res.render("about")
  })

  app.listen(3000, function() {
    console.log("we r live")
  })


}
