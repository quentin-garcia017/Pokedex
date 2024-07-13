import zod from "zod";
import { User } from "../models/User.js";

const passwordSchema = z
    .string()
    .min(8)
    .max(128);
    

const signSchema = zod.object({
    username: zod.string().min(3).max(128),
    email: zod.string().email(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
});

const loginSchema = zod.object({
    username: zod.string().min(3).max(128),
    password: passwordSchema,
});


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