# DevContainer Development Environment

Ce projet inclut une configuration DevContainer pour développer et tester une carte Home Assistant dans un environnement isolé.

## Prérequis

- Visual Studio Code
- Docker Desktop
- Extension VS Code: Dev Containers

## Démarrage rapide

1. Ouvrir le dossier dans VS Code
2. F1 → "Dev Containers: Reopen in Container"
3. Attendre l’initialisation de Home Assistant (1–2 min la première fois)
4. Construire la carte:
   ```bash
   npm install
   npm run build
   ```
5. Accéder à Home Assistant: http://localhost:8123

## Ressource de la carte

La ressource est définie via YAML:

- URL: `/local/workspaces/day_mode_card/day-mode-card.js`
- Type: Module

## Entités de test

Des entités `input_select` sont incluses pour valider la carte:

- `input_select.mode_jour`: Maison, Travail, Télétravail, Absence
- `input_select.mode_thermostat`: Eteint, Chauffage, Climatisation, Ventilation

## Debug

- Logs HA: `/config/home-assistant.log`
- Console navigateur: F12

## Arrêt

- Fermer VS Code ou F1 → "Dev Containers: Reopen Folder Locally"
