# rfp-responder

## Structure

### The content (answers)
In `content` directory, you have multiple simple markdown files.
Each markdown file explains one specific topic.
Each file has a name like `api.md`.The name (without extension) is important because is used to "tag" the questions.

### Questions
The question are stored in the `qna-test.txt` file.
The first line of the file is the header.
Then we have multiple lines.
Each line is a question with the "tag" for the answer.
Question and answer in the same line are separated by  the question mark character `?`.
For example you have:
```
Which kind of API do you support? api
```
It means, that for questions similar to "Which kind of API do you support?" the answer is in the `api` file in the content directory with the md extension. With the example the answer is `content/api.md` file.
You can have multiple questions (that refers to the same answer) because typically question could have a different format

## The training process

The script train.js loads all the questions and generates the model `model.nlp`
For training the model:
```
node train.js
```
You have to train the model only if you add (or edit) a question.
Once the model is trained and generated you can perform multiple question.

## Answering a question
The `answer.js` script has the logic to ask a question, collect the question and process the question with the trained model.
Once the script has the tagged answer (for example `api`) use the tag to load the right file with the content of the answer.
