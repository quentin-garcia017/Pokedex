import z from "zod";
import { User } from "../models/User.js";
import Scrypt from "../utils/scrypt.js";


const passwordSchema = z
    .string()
    .min(8)
    .max(128);
    

const signSchema = z.object({
    username: z.string().min(3).max(128),
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
});

const loginSchema = z.object({
    username: z.string().min(3).max(128),
    password: passwordSchema,
});

const authController = {
    login(req, res) {
        res.render('login', {
            error: req.query.error,
        });
    },
    logout(req, res) {
        req.session.destroy();
        res.redirect('/pokemons');
    },
    signup(req, res) {
        res.render('signup');
    },

async loginAction(req, res) {
        const resultValidation = loginSchema.safeParse(req.body);
        if (!resultValidation.success) {
            return res.status(400).json({ message: resultValidation.error.message });
        }
        const dataValidated = resultValidation.data;
        try {
        const user = await User.findOne({ where: { username: dataValidated.username } });
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        const isPasswordCorrect = await Scrypt.verify(dataValidated.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        req.session.userId = user.id;
        res.redirect('/pokemons');
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
},

    async signupAction(req, res) {
        const resultValidation = signSchema.safeParse(req.body);
        if (!resultValidation.success) {
            return res.status(400).json({ message: resultValidation.error.message });
        }
        const dataValidated = resultValidation.data;

        if(dataValidated.password !== dataValidated.confirmPassword) {
            return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
        }
        try {
            const user = await User.findOne({ 
                where: {
                    email: dataValidated.email,
                },
    });
            if (user) {
                res.redirect('/signup?error=emailAlreadyUsed');
                return;
            }

            const passwordHash = await Scrypt.hash(dataValidated.password);

            await User.create({ username: dataValidated.username, email: dataValidated.email, password: passwordHash });
            res.redirect('/pokemons');
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    },
};



export const signup = async (req, res) => {
    const { username, email, password, confirmPassword } = signSchema.parse(req.body);

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
    }

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    const newUser = await User.create({ username, email, password });
    res.json(newUser);
};

export const login = async (req, res) => {
    const { username, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = user.generateJWT();
    res.json({ token });
};

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Déconnexion réussie" });
};

export default authController;