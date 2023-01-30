const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEn } = require('@nlpjs/lang-en');
const { dockStart, ConsoleConnector } = require('@nlpjs/basic');

const fs = require('fs');

var express = require("express");
var app = express();
let dock;
let nlp;
(async () => {
    dock = await dockStart({ use: ['Basic', 'Qna'], nlu: { useNoneFeature: false } });
    nlp = dock.get('nlp');
    if (fs.existsSync('./model.nlp')) {
        nlp.load('./model.nlp');
    } else {
        return;
    }
})();
app.post("/question", async  (req, res, next) => {
    console.log(req)
    question = req.body.question
    console.log(question)
    const response = await nlp.process('en', question);
    console.log(response);
    let answer = ""
    if (response.answer) {
        answer = response.answer.trim()
    } else {
        console.log("I don't know the answer, help me to train")
        answer=""
    }

    let data = ""
    try {
        answer = answer.replace(".", "/")
        data = fs.readFileSync('./content/' + answer + '.md', 'utf8');
        console.log('💫💫💫💫💫💫💫💫💫💫💫💫💫')
        console.log(data);
        console.log('💫💫💫💫💫💫💫💫💫💫💫💫💫')
    } catch (err) {
        data = "Error:" + err
        console.error(err);
    }
    res.send(data);

    //res.json(response);
    //res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});