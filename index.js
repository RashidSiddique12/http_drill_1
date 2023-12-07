const http = require("http");
const { v4: uuidv4 } = require("uuid");

const server = http.createServer((req, res) => {
  const url = req.url;
  const splitUrl = url.split("/");
  const id = splitUrl[splitUrl.length - 1];
  const endPoint = splitUrl[splitUrl.length - 2];
  if (req.method == "GET" && req.url == "/GET/html") {
    res.write(`<!DOCTYPE html>
        <html>
          <head>
          </head>
          <body>
              <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
              <p> - Martin Fowler</p>
        
          </body>
        </html>`);
    res.end();
  } else if (req.method == "GET" && req.url == "/GET/json") {
    const Jsondata = {
      slideshow: {
        author: "Yours Truly",
        date: "date of publication",
        slides: [
          {
            title: "Wake up to WonderWidgets!",
            type: "all",
          },
          {
            items: [
              "Why <em>WonderWidgets</em> are great",
              "Who <em>buys</em> WonderWidgets",
            ],
            title: "Overview",
            type: "all",
          },
        ],
        title: "Sample Slide Show",
      },
    };

    const stringData = JSON.stringify(Jsondata);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(stringData);
  } else if (req.method == "GET" && req.url == "/GET/uuid") {
    const generatUuid = uuidv4();
    const JsonUuid = {
      uuid: generatUuid,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(JsonUuid));
    res.end();
  } else if (req.method == "GET" && endPoint == "status") {
    if (id >= 100 && id < 600) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`Response code : ${id}`);
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(`Response code not valid`);
      res.end();
    }
  } else if (req.method == "GET" && endPoint == "delay") {
    setTimeout(() => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`Success After ${id} Second`);
    }, id * 1000);
    
  } else if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Home Page");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("Page not found");
    res.end();
  }
});

server.listen(8000, () => {
  console.log("Server is on 8000...");
});
