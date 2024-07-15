// Import des variables d'environnement
import "dotenv/config";

import express from "express";
import cors from "cors";

import { router } from "./app/router.js";
import session from "express-session";
import putUserDataInReq from "./app/middlewares/putUserDataInReq.js";

// Création de l'application
const app = express();


// Autorisation des Cross-origin requests
app.use(cors({
  origin: 'http://127.0.0.1:5500', // URL de votre front-end
  credentials: true
}));

// Body parsers
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 

app.use(session({
  secret: 
    process.env.SESSION_SECRET ||
    "super secret",
  resave: false,
  saveUninitialized: true,
  cookie: {   httpOnly: true,
    secure: false, 
    maxAge: 1000 * 60 * 60 * 24
  } 
}));

app.use(putUserDataInReq);


// Mise en place du router
app.use(router);


// Démarrage du serveur
const port = process.env.PORT || 3000;
await app.listen(port);
console.log(`🚀 API demarrée à l'adresse : http://localhost:${port}`);
