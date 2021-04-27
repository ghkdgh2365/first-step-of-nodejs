var http = require('http');
const fs = require('fs');
const qs = require('querystring');
const url = require('url');

const templateFunction = {
  HTML: function (fileList, title, body, control){
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
        </ul>
        <hr/>
        ${control}
        <hr/>
        ${body}
      </body>
      </html>
    `
  }
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
          const template = templateFunction.HTML(
            fileList, 
            "welcome", 
            "<h2>Hello Node.js</h2>",
            `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(template);
        })
      }
      else {
        fs.readdir('./data', (error, fileList) => {
          fs.readFile(`data/${idValue}`, 'utf-8', (err, data) => {
            content = data
            const template = templateFunction.HTML(
              fileList, 
              `WEB1 - ${idValue}`, 
              content,
              ` <a href="/create">create</a>
                <a href="/update?id=${idValue}">update</a>
                <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${idValue}">
                  <input type="submit" value="delete">
                </form>
              `
            )
            response.writeHead(200);
            response.end(template);
          })
        })
      }
    }
    else if ( urlInfo.pathname === '3000/create') {
      console.log(urlInfo.pathname)
      fs.readdir('./data', (error, fileList) => {
        fs.readFile(`data/${idValue}`, 'utf-8', (err, data) => {
          content = `
            <form action="/create_process" method="post">
              <p><input type="text" name="title" placeholder="title"></p>
              <p>
                <textarea name="description" placeholder="description"></textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
          `
          const template = templateFunction.HTML(
            fileList, 
            `WEB1 - ${idValue}`, 
            content,
            ''
          )
          response.writeHead(200);
          response.end(template);
        })
      })
    }
    else if ( urlInfo.pathname === '3000/create_process'){
      let body = '';
      request.on('data', function(data){
        body += data;
        if (body.length > 1e6){
          request.connection.destroy();
        }
      });
      request.on('end', function(){
        let post = qs.parse(body);
        const title = post.title;
        const description = post.description;
        console.log(`post!@!`, post.title);
        fs.writeFile(`data/${title}`, description, 'utf-8', (err) => {
          console.log(`error message`, err);
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        })
      });
    }
    else if(urlInfo.pathname === '3000/update') {
      fs.readdir('./data', (error, fileList) => {
        fs.readFile(`data/${idValue}`, 'utf-8', (err, data) => {
          let content = `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value=${idValue}>
              <p><input type="text" name="title" placeholder="title" value=${idValue}></p>
              <p>
                <textarea name="description" placeholder="description">${data}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
          `
          const template = templateFunction.HTML(
            fileList, 
            `WEB1 - ${idValue}`, 
            content,
            ``
          )
          response.writeHead(200);
          response.end(template);
        })
      })
    }
    else if (urlInfo.pathname === `3000/update_process`) {
      let body = '';
      request.on('data', function(data){
        body += data;
        if (body.length > 1e6){
          request.connection.destroy();
        }
      });
      request.on('end', function(){
        const post = qs.parse(body);
        const id = post.id
        const title = post.title;
        const description = post.description;
        console.log(`??!?!?!?!?`,post)
        console.log(`post!@!`, id);
        console.log(`post!@!`, post.title);
        fs.rename(`data/${id}`, `data/${title}`, ()=> {
          fs.writeFile(`data/${title}`, description, 'utf-8', (err) => {
            console.log(`error message`, err);
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          })
        })
      });
    }
    else if (urlInfo.pathname === `3000/delete_process`) {
      let body = '';
      request.on('data', function(data){
        body += data;
        if (body.length > 1e6){
          request.connection.destroy();
        }
      });
      request.on('end', function(){
        const post = qs.parse(body);
        const id = post.id;
        fs.unlink(`data/${id}`, (error) => {
          response.writeHead(302, {Location: `/`});
          response.end();
        })
        console.log(`??!?!?!?!?`,post)
        console.log(`post!@!`, id);
      });
    }
    else{
      console.log(`??????`, urlInfo.pathname)
      response.writeHead(404);
      response.end('Not Found');
    }
});
app.listen(3000);