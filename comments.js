// Create web server

// Import modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

// Create web server
var app = http.createServer(function (request, response) {
    // Get url
    var _url = request.url;
    // Parse url
    var queryData = url.parse(_url, true).query;
    // Get pathname
    var pathname = url.parse(_url, true).pathname;

    // If pathname is root
    if (pathname === '/') {
        // If queryData.id is undefined
        if (queryData.id === undefined) {
            // Get file list
            fs.readdir('./data', function (error, filelist) {
                // Set title
                var title = 'Welcome';
                // Set description
                var description = 'Hello, Node.js';
                // Create list
                var list = template.list(filelist);
                // Create html
                var html = template.html(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);
                // Send html
                response.writeHead(200);
                response.end(html);
            });
        } else {
            // Get file list
            fs.readdir('./data', function (error, filelist) {
                // Get filtered id
                var filteredId = path.parse(queryData.id).base;
                // Read file
                fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
                    // Set title
                    var title = queryData.id;
                    // Create list
                    var list = template.list(filelist);
                    // Create sanitized title
                    var sanitizedTitle = sanitizeHtml(title);
                    // Create sanitized description
                    var sanitizedDescription = sanitizeHtml(description, {
                        allowedTags: ['h1']
                    });
                    // Create html
                    var html = template.html(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`, `<a href="/create">create</a> <a href="/update?id=${sanitizedTitle}">update</a> <form action="delete_process" method="post" onsubmit="return confirm('Do you want to delete?')"><input type="hidden"