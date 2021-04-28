module.exports = {
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
        <h1><a href="/">WEB2</a></h1>
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