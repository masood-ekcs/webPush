const express = require('express')
const bodyParser = require('body-parser')
const webPush = require('web-push')
const uuid = require('uuid')
const app = express()
const mongoose = require('mongoose')
const user = require('./models/user.js')

mongoose.connect("mongodb+srv://sunilkumar:Ekcs@test1.alglrqy.mongodb.net/?retryWrites=true&w=majority").then(() => { console.log("Connected with DB") }).catch((err) => { console.log(err) })


app.use(bodyParser.json())
app.use(express.static(__dirname + "/public"))
// In the backend, a file cannot send a response to another file.
// However, we can send files through a STATIC folder. Here, we have created a PUBLIC folder as our Static folder. So, we’ll move all the dependent files, script.js and style.css files in a folder called, ‘PUBLIC’ and will update our code.

app.set("view engine", "ejs")
app.get("/", (req, res) => {
    res.render("index")
})


app.post("/data", async (req, res) => {

    // res.json({ message: 'Successfully registered' })
    let subscription = req.body
    let email = uuid.v4()
    let user1 = new user({email: email, name: "Ayush", subscription})
    let test = await user1.save()
    console.log(test)
    res.send("Okay")                        



})


// These keys will help us to Register at Client’s end…
// We will save these keys in a variable to use it in our application…
// For webPush, we HAVE to use these mathematically generated keys ONLY. We cannot use any other keys.
app.get("/sendNotification", async (req, res) => {

    let allusers = await user.find({})
    for (let i = 0; i < allusers.length; i++) {
        let payload = JSON.stringify({ title: "Test Notification", body: "Hello this is body", image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" })
        webPush.sendNotification(allusers[i].subscription, payload).catch(err => console.error(err));

    }

    res.send("Notifications sent")


})


const public_key = "BJfT0VtK77zmrMP1BXVs2Zi1-NjwkjUZoEzzCvSGJYR1P2AhyKml-KypPZO_WZzoqed-281a93dSR2VUsPkV4oA"
const private_key = "thBDfAUEe1Te5O_bmxVjh6ma_mirHtYGgcJp9p9wKkc"


// with the help of webPush, we'll set these keys
// Publisher/Developer's email ID – used to send future email by the Browser, in case of any issue
webPush.setVapidDetails('mailto:kryptonites.ju@gmail.com', public_key, private_key)


// ≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠ S E R V E R
// const port = 3000
const port = process.env.PORT || 3000
app.listen(port, (err) => { (err) ? console.log(err) : console.log("Server is running on http://localhost:" + port) })