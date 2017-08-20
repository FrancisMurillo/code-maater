/* eslint no-prototype-builtins: [0]*/
/* eslint no-magic-numbers: [0]*/
/* eslint no-negated-condition: [0]*/
/* eslint no-process-env: [0]*/
/* eslint no-process-exit: [0]*/
/* eslint no-console: [0]*/
/* eslint no-sync: [0]*/
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import shell from "shelljs";

dotenv.config();

const {
    "JAVA_COMMAND": javaCommand,
    "GIT_COMMAND": gitCommand,
    "CODE_MAAT_JAR_FILE": codeMaatJarFile,
    "PROJECT_DIR": baseProjectDir
} = process.env;

const projectDir = path.resolve(baseProjectDir);

if (!shell.which(javaCommand)) {
    console.error(`Java command(JAVA_COMMAND) does not exist:
 ${javaCommand}`);
    process.exit(1);
}

if (!shell.which(gitCommand)) {
    console.error(`Git command(GIT_COMMAND) does not exist:
 ${gitCommand}`);
    process.exit(1);
}

if (!fs.existsSync(codeMaatJarFile)) {
    console.error(`Code Maat file(CODE_MAAT_JAR_FILE)
 does not exist: ${codeMaatJarFile}`);
    process.exit(1);
}

if (!fs.existsSync(projectDir)) {
    console.error(`Project repo/directory(PROJECT_DIR)
 does not exist: ${codeMaatJarFile}`);
    process.exit(1);
}

console.log("Read the configuration file .env");
console.log(`Project directory: ${projectDir}`);

const logDirName = ".logs";
const logDir = path.join(projectDir, logDirName);
shell.mkdir("-p", logDir);
console.log("Created log directory");

const commitFileName = ".commits";
const commitFile = path.join(logDir, commitFileName);

let commitData = "";
shell.exec(
    `${gitCommand} log --format=%cI,%H`,
    {"cwd": projectDir},
    (code, stdout, _stderr) => {
        if (code > 0) {
            console.error("Could not get commit data");
            process.exit(1);
        } else {
            commitData = stdout
                .split("\n")
                .map((line) => line.split(","))
                .map(([date, hash]) => ({
                    date,
                    hash
                }));
        }
    });

console.log("Acquired commit data");

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
    } else if (endDate < startDate) {
        res.status(422)
            .send(`Start Date is greater than End Date:
 ${startDate} > ${endDate}`);
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
