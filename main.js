var http = require('http');
const fs = require('fs');
const url = require('url');

var app = http.createServer(function(request,response){
    const _url = request.headers.host + request.url
    // const queryData = url.parse(_url, true).query;
    const queryData = new URL(_url).searchParams;
    let idValue = queryData.get('id');
    let content;
    let urlInfo = new URL(_url)
    console.log(new URL(_url));
    if (urlInfo.pathname === '3000/'){
      if (idValue === null){
        var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - Hello World!</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ul>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>
            <h2>HOME</h2>
            <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
            <img src="coding.jpg" width="100%">
            </p><p style="margin-top:45px;">
              Hello Node.js !
            </p>
          </body>
          </html>
        `;
        response.writeHead(200);
        response.end(template);
      }
      else {
        fs.readFile(`data/${idValue}`, 'utf-8', (err, data) => {
          content = data
          var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${idValue}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              <ul>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
              </ul>
              <h2>${idValue}</h2>
              <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
              <img src="coding.jpg" width="100%">
              </p><p style="margin-top:45px;">
                ${content}
              </p>
            </body>
            </html>
          `;
          response.writeHead(200);
          response.end(template);
        }) 
      }
    }
    else{
      response.writeHead(404);
      response.end('Not Found');
    }
});
app.listen(3000);