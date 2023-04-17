import { Injectable, NestMiddleware } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const token = req.header("auth-user");
    if (!token) {
      return res.status(401).json({ message: "Accès non autorisé" });
    }

    try {
      // Décoder le token JWT
      const decoded = jwt.verify(token, "nadadebla"); // Remplacez 'votre_secret_key' par votre clé secrète pour décoder le token
      console.log(decoded);
      // Injecter la propriété 'userId' dans l'objet 'request'
      req["userId"] = decoded["userId"];
      // Appeler la fonction 'next()' pour passer au middleware ou à la route suivante
    } catch (err) {
      console.log(err);
      // En cas d'erreur de décodage du token
      return res.status(401).json({ message: "Accès non autorisé" });
    }
    next();
  }
}
