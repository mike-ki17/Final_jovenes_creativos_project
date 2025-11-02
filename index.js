import { PORT } from "./config.js";
import router from "./routes.js";
import App from "./app.js";


const app = new App({
    port: PORT,
    routes: router
});

app.start();