"use strict";
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const config = require('./config_loader.js');
const packageJson = require('../package.json');
const compression = require('compression');


// Expressアプリケーションの開始
const app = express();
app.use(compression({level: 6}));

// JWS用のシークレット
app.set( 'superSecret', config.secret );

/**
 * 静的ファイルディレクトリ
 */
app.use('/public', express.static( path.resolve( 'public')));
app.use('/assets', express.static(  path.resolve('assets')));


app.get('/', function(req, res) {
	res.redirect(302, "./public/index.html");
});

/**
 * Body部をJSONとして扱う設定
 */
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ limit:'50mb',extended: true })); // for parsing application/x-www-form-urlencoded


/**
 * エラーレスポンス（優先順位を最後にするため、他のルーティングより後にすること）
 */
app.use((req, res, next)=>{
	console.error('404 page not found : ' + req.path);
	res.status(404).end('404 page not found : ' + req.path);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!' + err.stack);
});

/**
 * サーバーの起動
 */
const server = app.listen(config.server_port, ()=>{
	console.info("Node.jsはPORT:" + server.address().port + "をリッスンしています。" );
});


