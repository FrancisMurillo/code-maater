/* eslint no-prototype-builtins: [0]*/
/* eslint no-magic-numbers: [0]*/
/* eslint no-negated-condition: [0]*/
/* eslint no-process-env: [0]*/
/* eslint no-console: [0]*/
import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));

const router = express.Router();

const datePattern = /\d{4}-\d{2}-\d{2}/;
const isDateValue = (value) => datePattern.test(value);

const analysisValues = {
    "summary": "summary",
    "revision": "revision",
    "coupling": "coupling",
    "age": "age",
    "abs-churn": "abs-churn",
    "author-churn": "author-churn",
    "entity-churn": "entity-churn",
    "entity-ownership": "entity-ownership",
    "entity-effort": "entity-effort"
};
const isAnalysisValue =
      (value) => analysisValues.hasOwnProperty(value);

router.get("/code-maat", (req, res) => {
    const {
        "start_date": startDate,
        "end_date": endDate,
        analysis
    } = req.query;

    if (!isDateValue(startDate)) {
        res.status(422)
            .send(`Start Date(start_date) is a required date: ${startDate}`);
    } else if (!isDateValue(endDate)) {
        res.status(422)
            .send(`End Date(end_date) is a required date: ${endDate}`);
    } else if (!isAnalysisValue(analysis)) {
        res.status(422)
            .send(`Analysis(analysis) is not a valid analysis type:
 ${analysis}`);
    } else {
        res.json("Oka");
    }
});

app.use(router);
app.set("port", (process.env.PORT || 23001));
app.listen(app.get("port"), () => {
    console.log(`Listening on ${app.get("port")}`);
});
