import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();


const router = Router();

router.get("/public", (req, res) => {
    res.json({ message: "This is a public route." })
});



router.get("/login", (req, res) => {
    const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN as string;
    const CLIENT_ID = process.env.AUTH0_CLIENT_ID as string;
    const REDIRECT_URI = process.env.REDIRECT_URI as string;
    const url = `https://${AUTH0_DOMAIN}/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid profile email`;
    res.redirect(url);
});

router.get("/callback", async (req, res) => {
    const code = req.query.code;
    const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN as string;
    const CLIENT_ID = process.env.AUTH0_CLIENT_ID as string;
    const CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET as string;
    const REDIRECT_URI = process.env.REDIRECT_URI as string;
    
    try {
        const response = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
            grant_type: "authorization_code",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URI,
        });
        
        const token = response.data.access_token;

        res.json({ access_token: token });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error getting token", error.response ? error.response.data : error.message);
        } else {
            console.error("Unexpected error", error);
        }
        res.status(500).send("Error getting token");
    }
});


import checkJwt from "../middleware/auth";

router.get("/private", checkJwt, (req, res) => {
    res.json({ message: "This is a protected route. You are authenticated!" });
});

export default router;