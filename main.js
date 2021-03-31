var http = require('http');
const fs = require('fs');
const url = require('url');

function templateHTML(fileList, title, body){
  let list = '';
  for (var i =0; i < fileList.length; i++){
    list += `<li><a href="/?id=` + `${fileList[i]}">` + `${fileList[i]}` + `</a></li>`;
  }
  return `
    <!doctype html>
    <html>
    <head>
      <title>${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB1</a></h1>
      <ul>
        ${list}
        <li><a href="/create">create</a>
      </ul>
      ${body}
    </body>
    </html>
  `
}

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
        fs.readdir('./data', (error, fileList) => {
          const template = templateHTML(fileList, "welcome", "<h2>Hello Node.js</h2>");
          response.writeHead(200);
          response.end(template);
        })
      }
      else {
        fs.readdir('./data', (error, fileList) => {
          let list = '';
          for (var i =0; i < fileList.length; i++){
            list += `<li><a href="/?id=` + `${fileList[i]}">` + `${fileList[i]}` + `</a></li>`;
          }
          fs.readFile(`data/${idValue}`, 'utf-8', (err, data) => {
            content = data
            const template = templateHTML(fileList, `WEB1 - ${idValue}`, content)
            response.writeHead(200);
            response.end(template);
          })
        })
      }
    }
    else if ( urlInfo.pathname === '3000/create') {
      console.log(urlInfo.pathname)
      fs.readdir('./data', (error, fileList) => {
        let list = '';
        for (var i =0; i < fileList.length; i++){
          list += `<li><a href="/?id=` + `${fileList[i]}">` + `${fileList[i]}` + `</a></li>`;
        }
        fs.readFile(`data/${idValue}`, 'utf-8', (err, data) => {
          content = `
            <form action="http://localhost:3000/process_create" method="post">
              <p><input tpye="text" name="title" placeholder="title"></p>
              <p>
                <textarea name="description" placeholder="description"></textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
          `
          const template = templateHTML(fileList, `WEB1 - ${idValue}`, content)
          response.writeHead(200);
          response.end(template);
        })
      })
    }
    else{
      console.log(`??????`, urlInfo.pathname)
      response.writeHead(404);
      response.end('Not Found');
    }
});
app.listen(3000);