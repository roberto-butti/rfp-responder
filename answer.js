const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEn } = require('@nlpjs/lang-en');
const { dockStart, ConsoleConnector } = require('@nlpjs/basic');

const fs = require('fs');


(async () => {
    const dock = await dockStart({ use: ['Basic', 'Qna'], nlu: { useNoneFeature: false } });
    const nlp = dock.get('nlp');
    if (fs.existsSync('./model.nlp')) {
        nlp.load('./model.nlp');
    } else {
        return;
    }
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    console.clear()
    console.log("🧙 Hi, My name is Robertito AI.");
    readline.question(`❓ What is your question about Storyblok? `, async (question) => {
        console.log("🧙 Let me try to answer to your question.");
        console.log("📜 Your question is: " + question);
        const response = await nlp.process('en', question);
        console.log(response);
        let answer = ""
        if (response.answer) {
            answer = response.answer.trim()
        } else {
            console.log("I don't know the answer, help me to train")
            return
        }

        try {
            answer = answer.replace(".","/")
            const data = fs.readFileSync('./content/' + answer + '.md', 'utf8');
            console.log('💫💫💫💫💫💫💫💫💫💫💫💫💫')
            console.log(data);
            console.log('💫💫💫💫💫💫💫💫💫💫💫💫💫')
        } catch (err) {
            console.error(err);
        }


        readline.close();
    });

})();