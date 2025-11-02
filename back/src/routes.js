import {Router} from "express";

const router = Router();


router.get("/", (req, res) => {
    res.send("Hello, World!");
})

router.get("/home", (req, res) => {
    res.send("Hello, home!");
})


export default router;