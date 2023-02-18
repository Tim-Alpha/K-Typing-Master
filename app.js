const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    let date_ob = new Date();
    let seconds = date_ob.getSeconds();
    let minutes = date_ob.getMinutes();
    res.render("battle");
});

app.post("/", function (req, res) {
    let Question = req.body.question;
    let Answer = req.body.answer;

    console.log(Question);
    console.log(Answer);

    let correct = 0;
    let wrong = 0;
    for (let i = 0; i < Question.length; i++) {
        if (Question[i] === Answer[i]) {
            correct++;
        } else {
            wrong++;
        }
    }
    let accuracy = Math.round(((correct)/(correct+wrong))*100);
    let totalWords = correct+wrong;
    res.render("result", {
        TotalWords: totalWords,
        Correct: correct,
        Wrong: wrong,
        Accuracy: accuracy,
    });
});

// app.get("/result",function(req,res){
//     res.render("result");
// });

app.listen(process.env.PORT || port, () => console.log('Server is running at port ', port));