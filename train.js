const { dockStart } = require('@nlpjs/basic');
const fs = require('fs');

(async () => {
    const dock = await dockStart({ use: ['Basic', 'Qna'], nlu: { useNoneFeature: false } });
    const nlp = dock.get('nlp');

    const modelFileName = './qna-test.txt'
    console.log(`🧙 Going to training via Questions from ${modelFileName}.`);
    await nlp.addCorpus(
        {
            filename: modelFileName,
            importer: 'qna',
            locale: 'en',
            separator:'?',
            hasHeader: true
        }
    );
    await nlp.train();

    console.log("TRAIN DONE");
    console.log("");

})();