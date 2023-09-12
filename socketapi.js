const io = require("socket.io")();
const usermodel = require("./routes/users.js")
const chatmodel = require("./routes/chat.js")
const socketapi = {
    io: io
};

io.on("connection", function (socket) {
    console.log("A user connected");
    socket.on("connecteduser", async msg => {
        var connecteduser = await usermodel.findOne({ username: msg.username })
        connecteduser.currentsocket = socket.id
        connecteduser.save()
    })
    socket.on("msgfromsender", async msg => {
        var fromuser = await usermodel.findOne({ username: msg.fromuser })
        msg.fromuserpic = fromuser.profileImage
        var touser = await usermodel.findOne({ username: msg.touser })
        var indexoffromuser = touser.friends.indexOf(fromuser._id)
        if (indexoffromuser == -1) {
            touser.friends.push(fromuser._id)
            fromuser.friends.push(touser._id)
            await touser.save()
            await fromuser.save()
            msg.NewChat = true
        }
        var newmsg =await chatmodel.create({
            message:msg.message,
            touser:touser.username,
            fromuser:fromuser.username,
        })
        if(touser.currentsocket){
            socket.to(touser.currentsocket).emit("jiskobhejnathauseebhejomsg", msg)
        }
    })
    socket.on("disconnect" , async ()=>{
        var disconnect =await usermodel.findOneAndUpdate({currentsocket : socket.id},{currentsocket : ""})
    })
});

module.exports = socketapi;