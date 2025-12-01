export default function appSrc(
  express,
  bodyParser,
  createReadStream,
  crypto,
  http
) {
  const app = express();

  const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS,DELETE",
  };

  app.use((req, res, next) => {
    res.set(CORS);
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
  });

  const path = import.meta.url.substring(7);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get("/login/", (req, res) => {
    res.send("27a51f8a-d703-492b-9fe6-b1d0e877d2ad");
  });

  app.get("/code/", (req, res) => {
    const stream = createReadStream(path);
    stream.pipe(res);
  });

  app.get("/sha1/:input/", (req, res) => {
    const hash = crypto
      .createHash("sha1")
      .update(req.params.input)
      .digest("hex");
    res.send(hash);
  });

  app.get("/req/", (req, res) => {
    http.get(req.query.addr, (r) => r.pipe(res));
  });

  app.post("/req/", (req, res) => {
    http.get(req.body.addr, (r) => r.pipe(res));
  });

  app.all("/*", (req, res) => {
    res.send("27a51f8a-d703-492b-9fe6-b1d0e877d2ad");
  });

  return app;
}
