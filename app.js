//make array of colors and id of colors
let arrayOfColors = [
    { colorWord: "Blue", idOfColor: "#0000FF" },
    { colorWord: "Black", idOfColor: "#000000" },
    { colorWord: "Light blue", idOfColor: "#02e9f4" },
    { colorWord: "Pink", idOfColor: "#ff6299" },
    { colorWord: "Red", idOfColor: "#FF0000" },
    { colorWord: "Yellow", idOfColor: "#ffff00" },
    { colorWord: "Purple", idOfColor: "#ad02ff" },
    { colorWord: "Light green", idOfColor: "#96f000" },
    { colorWord: "Dark green", idOfColor: "#339933" },
    { colorWord: "Brown", idOfColor: "#cc6600" },
    { colorWord: "Gray", idOfColor: "#adad85" },
    { colorWord: "orange", idOfColor: "#ff960e" }
    ]

    let arrayOfFour = []//make Two-dimensional array of 4 random colors with id to sent to js 
    let hashPassword
    var emailOfUser
    var pointSave
    var userSave
    
const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('./data').userDB;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(bodyParser.json())

var fs = require('fs');
        
fs.appendFile('saveUsers.txt', '',function (err) {//make new txt in order to save data if the server close
    if (err) throw err;
    
    });



app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/logIndx.html'));
});


app.post('/register', async (req, res) => {//make new user
    try{
        let newUser
        var fs = require('fs');
        
        fs.appendFile('saveUsers.txt', '',function (err) {//make new txt in order to save data if the server close
            if (err) throw err;
            });


        if(users.length==0)//if its the first time i came in the copy from saveUsers.txt file the users data and put it in array "users"
        {
            var count=0
            var str1,str2,str3,str4
            const allFileContents = fs.readFileSync('saveUsers.txt', 'utf-8');
            allFileContents.split(/\r?\n/).forEach(line =>  {
                if(count==0)
                    str1 = line.slice();
                if(count==1)
                    str2 = line.slice();
                if(count==2)
                    str3 = line.slice();
                if(count==3){
                    str4 = line.slice();
                    newUser = {
                        id: str1,
                        username: str2,
                        email: str3,
                        password: str4,
                    };
                    users.push(newUser);//put in users array
                    // console.log(users)
                    count=-1
                }
                count++
            });
        }
        
        let foundUser = users.find((data) => req.body.email === data.email);//chack if user exist 
        if (!foundUser) {//if user not exist put the new user in the array users
            emailOfUser=req.body.email
            hashPassword = await bcrypt.hash(req.body.password, 10);
            newUser = {
                id: req.body.id,
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
            };
            users.push(newUser);
            //put in file the new data of user
            fs.appendFile('saveUsers.txt', 0+'\n'+ newUser.username+'\n'+newUser.email+'\n'+newUser.password+'\n',function (err) {
            if (err) throw err;
            });
            
            res.redirect('logIndx.html')//if every thing ok go to the begining of screen
        } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");//if the user exist go to login
        }
    } catch{
        res.send("Internal server error");
    }
});

app.post('/login', async (req, res) => {
    try{
        let newUser
        var fs = require('fs');
        
        fs.appendFile('saveUsers.txt', '',function (err) {//make new txt in order to save data if the server close
            if (err) throw err;
            
            });
            const buffer = fs.readFileSync("saveUsers.txt");
            const fileContent = buffer.toString();

        if(users.length==0&&fileContent!='')//if its the first time i came in the copy from saveUsers.txt file the users data and put it in array "users"
        {
            var count=0
            var str1,str2,str3,str4
            const allFileContents = fs.readFileSync('saveUsers.txt', 'utf-8');
            allFileContents.split(/\r?\n/).forEach(line =>  {
                if(count==0)
                    str1 = line.slice();
                if(count==1)
                    str2 = line.slice();
                if(count==2)
                    str3 = line.slice();
                if(count==3){
                    str4 = line.slice();
                    newUser = {
                        id: str1,
                        username: str2,
                        email: str3,
                        password: str4,
                    };
                    users.push(newUser);
                    // console.log(users)
                    count=-1
                }
                count++
            });
        }
        
        let foundUser = users.find((data) => req.body.email === data.email);
        if (foundUser) {//if found user get in
            emailOfUser=req.body.email
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.username;
               
                res.redirect('logIndx.html')//then dend to the game
            } else {
                //if didnt find user go to login again
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else {
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
            //if didnt find password go to login again
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});


server.listen(3000, function(){
    console.log("server is listening on port: 3000");
});


const randomNum = () => {//make array of 4 random colors
    var arr = [];
    
    var temp=0
    var j=0
    for(var i=0; i<arrayOfColors.length; i++) {//in arrayOfColors array there are num of colors so make array with the numbers from 1 to arrayOfColors.length
        arr[i]=i;
    }
    
    while(temp!=4){
        var num = Math.floor(Math.random() * arrayOfColors.length)//random number
        if(arr[num]!=-1)//if we didnt use this number get in if we use it so go to loop while in order to choose 4 numbers that not ==
        {
            arr[num]=-1;//put -1 in the index
            temp++;//we have more one number
            arrayOfFour[j]=arrayOfColors[num]//put the new number in the array
            j++;
        }
    }
}

// app.get('/api/get-new-quote', (req, res) => {
//     var color1 = Math.floor(Math.random() * arrayOfColors.length)
//     res.send(arrayOfColors[color1]);
// });

app.get('/api/get-array-of-four-colors', (req, res) => {
    randomNum();
    res.send(arrayOfFour)
});

app.get('/get-user-max-points', (req, res) => {//get make point of user
    var yael=emailOfUser
    var countLine=0
    var num=1
    var lineTwo=2
    var lineOfPoint
    var lineOfUser
    var fs = require('fs');
    const allFileContents = fs.readFileSync('saveUsers.txt', 'utf-8');
            allFileContents.split(/\r?\n/).forEach(line =>  {
                countLine++
                if(num==countLine){
                    lineOfPoint = line.slice();
                    num=num+4
                }
                if(lineTwo==countLine){
                    lineOfUser = line.slice();
                    lineTwo=lineTwo+4
                }
                if(emailOfUser==line)//if find the user so send the max point of the user
                {
                    pointSave = lineOfPoint.slice();
                    userSave=lineOfUser.slice();
                }
            });

    res.send(pointSave)
});



app.post('/add-point', (req, res) => {//if i found max point so get the max new points and put the new max point in the data
    var newUser = {
        id: req.body.id,
    };

    var fs = require('fs');
    fs.readFile('saveUsers.txt', {encoding: 'utf8'}, function (err,data1234) {
        var formatted = data1234.replace(pointSave+'\n'+userSave+'\n'+emailOfUser, newUser.id+'\n'+userSave+'\n'+emailOfUser);
        fs.writeFile('saveUsers.txt', formatted, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });

    res.send(newUser);
});