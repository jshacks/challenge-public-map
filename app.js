/**
 * Created by wictort on 10/23/16.
 */

const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const timeseries = require("timeseries-analysis");

const app = express();

app.use(serveStatic(path.join(__dirname, 'static')));

app.listen(8080);

