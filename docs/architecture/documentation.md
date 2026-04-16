# Architecture — documentation (`docs/`)

## Rôle de `docs/`

- **Référence stable** : architecture, conventions, intégrations.
- **Runbooks** : procédures opérationnelles (déploiement, restauration DB, rotation de secrets).
- **ADR (optionnel)** : `docs/adr/` pour les décisions d’architecture numérotées (`0001-titre.md`).

## Ce qui ne va pas dans `docs/`

- **README racine** : démarrage rapide et commandes ; pointer vers `docs/` pour le détail.
- **Commentaires inline** : expliquer le « pourquoi » local dans le code, pas dupliquer tout le design system dans `docs/` sans lien.

## Fichiers vivants

Quand une fonctionnalité change le comportement observable (API, auth, déploiement) :

1. Mettre à jour le code et les tests.
2. Ajuster **`docs/`** ou **`README.md`** dans le même changement lorsque c’est nécessaire pour éviter la dérive.

## Skills IA vs docs

| | `docs/` | `skills/` |
|---|---------|-----------|
| Public cible | Équipe produit / tech | Agents IA |
| Format | Markdown libre | `SKILL.md` structuré |
| Exemple | Runbook deploy | « Comment ajouter un module Nest » |

Les deux se complètent : `docs/architecture/ai-skills.md` fait le lien.
