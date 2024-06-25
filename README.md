# BESAFE Project

## Introduction

Notre projet « BESAFE » représente la solution à la problématique de surveillance et de captation des données liées à la qualité de l'air dans un hôpital. En concevant et en réalisant une plateforme web intégrée à un système IoT, nous offrons aux professionnels de la santé un outil puissant pour surveiller en temps réel les paramètres de la qualité de l'air, tels que la température, l'humidité et les niveaux de contaminants. 

Cette solution leur permettra de prendre des mesures préventives, d'identifier rapidement les problèmes potentiels et de mettre en place des actions correctives pour garantir un environnement sain et sûr pour les patients et le personnel médical. Grâce à notre plateforme intuitive, les données sont visualisées de manière claire et compréhensible, offrant ainsi une base solide pour une prise de décision éclairée et une amélioration continue de la qualité de l'air dans l'hôpital.

## Technologies utilisées

### Frontend
- **React JS**
- **CSS**
- **JavaScript**

### Backend
- **Node.js**
- **Express.js**

### Base de données
- **MongoDB**

## Installation et Configuration

### Prérequis
Assurez-vous d'avoir les logiciels suivants installés sur votre machine :
- Node.js
- npm (Node Package Manager)
- MongoDB

### Étapes d'installation

1. Clonez le dépôt du projet sur votre machine locale :
   ```bash
   git clone https://https://github.com/maryamtamlalti2001/BeSafe.git
   
2. Accédez au répertoire du projet :
```bash
cd besafe
```
3. Installez les dépendances pour le frontend et le backend :

```bash
cd frontend
npm install
cd ../backend
npm install
Configurez la base de données MongoDB. Créez un fichier .env dans le répertoire backend et ajoutez-y les informations de connexion à la base de données :

bash
Copy code
MONGO_URI=mongodb://localhost:27017/besafe
Lancez l'application :

Démarrez le serveur backend :
bash
Copy code
cd backend
npm start
Démarrez le serveur frontend :
bash
Copy code
cd frontend
npm start
