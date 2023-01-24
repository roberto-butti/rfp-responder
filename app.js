const { dockStart } = require('@nlpjs/basic');
const fs = require('fs');

(async () => {
    const dock = await dockStart({ use: ['Basic', 'Qna'], nlu: { useNoneFeature: false } });
    const nlp = dock.get('nlp');
    await nlp.addCorpus({ filename: './qna.tsv', importer: 'qna', locale: 'en' });
    await nlp.train();
    console.log("TRAIN DONE");
    console.log("");
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    console.clear()
    readline.question(`❓ What is your question about Storyblok? `, async (question) => {
        console.log("🧙 Let me try to answer to your question.");
        console.log("📜 Your question is: " + question);
        const response = await nlp.process('en', question);
        console.log(response.answer);
        try {
            const data = fs.readFileSync('./content/' + response.answer, 'utf8');
            console.log('💫💫💫💫💫💫💫💫💫💫💫💫💫')
            console.log(data);
            console.log('💫💫💫💫💫💫💫💫💫💫💫💫💫')
        } catch (err) {
            console.error(err);
        }

        readline.close();
    });

})();