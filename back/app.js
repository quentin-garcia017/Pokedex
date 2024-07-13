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
app.use(cors());

// Body parsers
app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded

app.use(session({
  secret: 
    process.env.SESSION_SECRET ||
    "super secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 jours
  },
}));

app.use(putUserDataInReq);

// Mise en place du router
app.use(router);


// Démarrage du serveur
const port = process.env.PORT || 3000;
await app.listen(port);
console.log(`🚀 API demarrée à l'adresse : http://localhost:${port}`);
