const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Function to generate a random password
function generatePassword(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pass = "";
    for (let i = 0; i < length; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
}

// GET - show form
app.get('/', (req, res) => {
    const result = `<span style='color:blue'>Enter a password length!</span>`;
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Password Generator</title>
        </head>
        <body>
            <h3 align=center>Node Password Generator</h3>
            <form action="/" method="post">
                <label for="myLength">Password Length:</label>
                <input type="text" id="myLength" name="myLength">
                <input type="submit" value="Generate">
            </form>
            ${result}
        </body>
        </html>
    `);
});

// POST - generate password
app.post('/', (req, res) => {
    const lenInput = req.body.myLength;
    let result = "";

    if (!isNaN(lenInput) && Number(lenInput) > 0) {
        const pass = generatePassword(Number(lenInput));
        result = `<div style='color:green'><b>Your Password:</b> ${pass}</div>`;
    } else {
        result = `<span style='color:red'>Please enter a valid number!</span>`;
    }

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Password Generator</title>
        </head>
        <body>
            <h3 align=center>Node Password Generator</h3>
            <form action="/" method="post">
                <label for="myLength">Password Length:</label>
                <input type="text" id="myLength" name="myLength">
                <input type="submit" value="Generate">
            </form>
            ${result}
        </body>
        </html>
    `);
});

// Listen
app.listen(PORT, '0.0.0.0', () => {
    console.log(`App running on port ${PORT}`);
});
