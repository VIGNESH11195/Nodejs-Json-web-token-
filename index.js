const express = require('express');

const jwt = require('jsonwebtoken');

const app = express();


//User signin route - create a token and return to user
app.post('/api/signin', (req, res) => {
    const user = {
        id: 1,
        username: "arun",
        email: "arun@gmail.com" // Store the User in Json Format
    }
    jwt.sign({user},'SuperSecRetKey', { expiresIn: 60 * 60 }, (err, token) => {  // Json Web Token store Data as User convert as Token
        res.json({token});  // View the Token   // User Json format Converted As Token
    });


});


/** verifyToken method - this method verifies token */
function verifyToken(req, res, next){
    
    //Request header with authorization key
    const bearerHeader = req.headers['authorization'];
    
    //Check if there is  a header
    if(typeof bearerHeader !== 'undefined'){

        const bearer = bearerHeader.split(' ');
        
        //Get Token arrray by spliting
        const bearerToken = bearer[1];

        req.token = bearerToken;

        //call next middleware
        next();

    }else{

        res.sendStatus(403);

    }
}

/* Creae API route */
app.get('/api', (req, res) => {
    res.json({

        msg: "Welcome to NodeJS JWT Authentication Tutorial"

    });

});


/** Create posts protected route */

app.post('/api/posts', verifyToken, (req, res) => {

    jwt.verify(req.token, 'SuperSecRetKey', (err, authData)=>{  // Here we Check Json Web Token

        if(err){

            res.sendStatus(403);

        }else{

            res.json({

                msg: "A new post is created",

                authData

            });
        }

    });

});



app.listen(4400, () => console.log(' Server started and listening on port: 4400'));