import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
let puntos = 0;


app.use(ctx => {
  puntos++;
  ctx.response.body = "Hello World! " + puntos;
  
});


await app.listen("127.0.0.1:3000");

