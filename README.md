# Badminton Reservation API

## Description
Cette API permet de gérer les réservations de terrains de badminton pour une association. Elle inclut :
- Authentification des utilisateurs avec JWT.
- Gestion des réservations (création et consultation).
- Documentation interactive via Swagger UI.

---

## Table des Matières
- [Installation](#installation)
- [Lancer le Projet](#lancer-le-projet)
- [Cas d'Utilisation](#cas-dutilisation)
- [Conception](#conception)
    - [Dictionnaire des Données](#dictionnaire-des-données)
    - [Tableau Récapitulatif des Ressources](#tableau-récapitulatif-des-ressources)
- [Sécurité](#sécurité)
- [Remarques](#remarques)
- [Références](#références)

---

## Installation
1. Clonez le projet :
   ```bash
   git clone [votre-dépôt-git]
   cd badminton-reservation
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

---

## Lancer le Projet
1. Lancez le serveur :
   ```bash
   node index.js
   ```

2. Insérez un jeu de données minimal :
   ```bash
   node seeders/seed.js
   ```
   Cela créera un utilisateur administrateur avec :
    - **Nom d'utilisateur** : `admin1`
    - **Mot de passe** : `root`

3. Accédez à Swagger UI pour tester l'API :
   [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Cas d'Utilisation
### Authentification
- **Endpoint** : `POST /auth/login`
- **Body** :
  ```json
  {
      "username": "admin1",
      "password": "root"
  }
  ```
- **Réponse** :
  ```json
  {
      "token": "<JWT_TOKEN>"
  }
  ```

### Récupération des Réservations
- **Endpoint** : `GET /reservations`
- **Headers** :
  ```json
  {
      "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Réponse** :
  ```json
  [
      {
          "id": 1,
          "date": "2024-12-12",
          "time": "10:00",
          "terrain": "A",
          "userId": 1,
          "_links": {
              "self": { "href": "/reservations/1" },
              "user": { "href": "/users/1" }
          }
      }
  ]
  ```

### Création d'une Réservation
- **Endpoint** : `POST /reservations`
- **Headers** :
  ```json
  {
      "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Body** :
  ```json
  {
      "date": "2024-12-13",
      "time": "10:45",
      "terrain": "B"
  }
  ```
- **Réponse** :
  ```json
  {
      "id": 2,
      "date": "2024-12-13",
      "time": "10:45",
      "terrain": "B",
      "userId": 1
  }
  ```

---

## Conception

### Dictionnaire des Données
| Champ          | Type      | Description                                |
|----------------|-----------|--------------------------------------------|
| username       | STRING    | Nom d'utilisateur unique (User)           |
| password       | STRING    | Mot de passe haché (User)                 |
| role           | STRING    | Rôle utilisateur (admin ou user) (User)   |
| date           | DATEONLY  | Date de la réservation (Reservation)      |
| time           | STRING    | Heure de la réservation (Reservation)     |
| terrain        | STRING    | Nom du terrain (A, B, C, ou D) (Reservation) |

### Tableau Récapitulatif des Ressources
| Ressource     | URL                   | Méthodes HTTP | Paramètres/Variations | Commentaires                           |
|---------------|-----------------------|----------------|------------------------|---------------------------------------|
| Auth          | /auth/login          | POST           | Body : username, password | Retourne un token JWT                |
| Réservations | /reservations        | GET, POST      | Body : date, time, terrain | JWT requis pour POST, récupère ou crée des réservations |

---

## Sécurité
- **Authentification** : Basée sur JWT (Bearer token dans les headers).
- **Protection des routes sensibles** : Les routes comme `/reservations` sont protégées.
- **Rôle Administrateur** : L'utilisateur `admin1` a un accès spécial pour gérer certaines opérations.

---

## Remarques
- Une amélioration future pourrait inclure des tests automatisés pour valider les fonctionnalités de l'API.
- Les temps de réponse peuvent être optimisés en ajoutant un cache pour les requêtes fréquentes.

---

## Références
- [Documentation Sequelize](https://sequelize.org/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [JWT Guide](https://jwt.io/)

