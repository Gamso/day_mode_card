# Day Mode Card Dev

Cet espace de travail fournit:
 Un DevContainer (Home Assistant + Node) calqué sur le projet de référence.
 Une custom card écrite en TypeScript (`day-mode-card`).
 Un environnement HA de test avec deux `input_select` et un dashboard YAML.

## Prérequis
- Docker Desktop (Windows)
- VS Code + extension "Dev Containers"

## Démarrage rapide (DevContainer recommandé)
1. Ouvrez ce dossier dans VS Code.
2. F1 → "Dev Containers: Reopen in Container".
3. Attendez l’initialisation de Home Assistant (~1–2 min la 1re fois).
4. Dans le terminal du conteneur, construisez la carte:
   ```bash
   npm install
   npm run build
   ```
5. Accédez à Home Assistant: http://localhost:8123

## Structure DevContainer
- Config HA montée dans [/config](.devcontainer/config) via [.devcontainer/devcontainer.json](.devcontainer/devcontainer.json).
- Le build de la carte est monté dans `/config/www/workspaces/day_mode`.
- Dockerfile: [.devcontainer/Dockerfile](.devcontainer/Dockerfile)
- Script: [.devcontainer/setup.sh](.devcontainer/setup.sh)
- Guide: [.devcontainer/README.md](.devcontainer/README.md)

## Configuration HA incluse
Définie dans [.devcontainer/config/configuration.yaml](.devcontainer/config/configuration.yaml):
- `input_select.mode_jour`: Maison, Travail, Télétravail, Absence
- `input_select.mode_thermostat`: Eteint, Chauffage, Climatisation, Ventilation
- Ressource Lovelace: `/local/workspaces/day_mode/day-mode-card.js` (Type: module)

Dashboard: [.devcontainer/config/ui-lovelace.yaml](.devcontainer/config/ui-lovelace.yaml)
- `type: custom:day-mode-card` regroupe les deux sélecteurs
- Exemples `mushroom-select-card` inclus si vous installez Mushroom via HACS

## Utilisation de la custom card
Ajouter en YAML:
```yaml
type: custom:day-mode-card
name: Regroupement des modes
mode_jour_entity: input_select.mode_jour
mode_thermostat_entity: input_select.mode_thermostat
```

## Scripts de build
- `npm run build`: génère `dist/day-mode-card.js`
- `npm run watch`: reconstruit automatiquement

## Option B — Docker Compose (alternative locale)
```powershell
cd d:\day_mode\ha
docker compose up -d
```
Puis http://localhost:8123

## Arrêt
- Fermer VS Code (le conteneur s’arrête)
- Ou repasser en local: F1 → "Dev Containers: Reopen Folder Locally"
