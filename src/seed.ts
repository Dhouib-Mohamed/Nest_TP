import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Seeder } from "./standalone/seeder"; // Importer votre classe de seeder

async function bootstrap() {
  // Créer l'application Nest.js
  const app = await NestFactory.createApplicationContext(AppModule);
  // Instancier et exécuter votre classe de seeder
  const seeder = app.get(Seeder);
  await seeder.seed(); // Appeler la méthode de seed de votre classe de seeder
  await app.close();

}

// Appeler la fonction bootstrap pour démarrer le processus de seed
bootstrap();