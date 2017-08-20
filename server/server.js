/* eslint no-prototype-builtins: [0]*/
/* eslint no-magic-numbers: [0]*/
/* eslint no-negated-condition: [0]*/
/* eslint no-process-env: [0]*/
/* eslint no-process-exit: [0]*/
/* eslint no-console: [0]*/
/* eslint no-sync: [0]*/
import bodyParser from "body-parser";
import cache from "memory-cache";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import moment from "moment";
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
shell.rm("-rf", logDir);
shell.mkdir("-p", logDir);
console.log("Created log directory");

const shellOptions = {
    "cwd": projectDir,
    "silent": true
};

const commitFileName = ".commits";
const commitFile = path.join(logDir, commitFileName);

const commitOutput = shell.exec(
    `${gitCommand} log --format=%cI,%H`,
    shellOptions).stdout.trim();

fs.writeFileSync(commitFile, commitOutput);
const commitData = commitOutput
    .split("\n")
    .map((line) => line.split(","))
    .map(([date, hash]) => ({
        date,
        hash
    }));

const formatDate = (text) => text.split("T")[0];

const minDate = formatDate(commitData[commitData.length - 1].date);
const maxDate = formatDate(commitData[0].date);

console.log("Acquired commit data");

const analysisCache = new cache.Cache();

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

const toCamelCase = (text) =>
    text.replace(
        /-([a-z])/g,
        (match) => match[1].toUpperCase());

router.get("/", (req, res) => {
    res.send({
        minDate,
        maxDate
    });
});

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
    } else if (startDate < minDate) {
        res.status(422)
            .send(`Start Date is less than Min Date:
 ${startDate} < ${minDate}`);
    } else if (endDate > maxDate) {
        res.status(422)
            .send(`End Date is greater than Max Date:
 ${endDate} > ${maxDate}`);
    } else if (endDate < startDate) {
        res.status(422)
            .send(`Start Date is greater than End Date:
 ${startDate} > ${endDate}`);
    } else if (!isAnalysisValue(analysis)) {
        res.status(422)
            .send(`Analysis(analysis) is not a valid analysis type:
 ${analysis}`);
    } else {
        const cacheKey = [analysis, startDate, endDate].join("|");
        const cachedValue = analysisCache.get(cacheKey);

        if (cachedValue) {
            res.send(cachedValue);
        } else {
            const logFileName = `log--${startDate}--${endDate}`;
            const logFile = path.join(logDir, `${logFileName}.log`);

            if (!shell.test("-f", logFile)) {
                const logOutput = shell.exec(
                    `${gitCommand} log --pretty=format:'[%h] %aN %ad %s' --date=short --numstat --after=${startDate} --before=${endDate}`,
                    shellOptions).stdout.trim();

                fs.writeFileSync(logFile, logOutput);
            }

            const analysisFileName = `${logFileName}--${analysis}`;
            const analysisFile = path.join(logDir, `${analysisFileName}.csv`);

            if (!fs.existsSync(analysisFile)) {
                const analysisOutput = shell.exec(
                    `${javaCommand} -jar ${codeMaatJarFile} -l ${logFile} -c git -a ${analysis}`,
                    shellOptions).stdout.trim();

                fs.writeFileSync(analysisFile, analysisOutput);
            }

            const analysisData = fs.readFileSync(analysisFile, "utf-8");

            const [baseHeaders, ...baseData] = analysisData.split("\n");
            const headers = baseHeaders.split(",").map(toCamelCase);
            const records = baseData.map((row) => {
                const record = Object.create(null);

                const fields = row.split(",");

                headers.forEach((header, index) => {
                    record[header] = fields[index];
                });

                return record;
            });

            analysisCache.put(cacheKey, records);
            res.send(records);
        }
    }
});

app.use(router);
app.set("port", (process.env.PORT || 23001));
app.listen(app.get("port"), () => {
    console.log(`Listening on ${app.get("port")}`);
});
