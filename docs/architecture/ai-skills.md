# Architecture — skills IA (agents)

## Objectif

Le dossier **`skills/`** à la racine du dépôt centralise les **instructions réutilisables** pour les agents IA (Cursor, Claude Code, etc.) : même idée que les Agent Skills (fichier `SKILL.md`, métadonnées, progressive disclosure).

## Structure

```
skills/
├── README.md           # Conventions + lien vers registry.yml
├── registry.yml        # Inventaire machine (id, chemin, triggers)
├── _template/
│   └── SKILL.md        # Modèle vierge pour un nouveau skill
└── <nom-du-skill>/
    └── SKILL.md        # Skill réel
```

## Règles

1. **Un skill = un dossier** nommé en `kebab-case`.
2. **`SKILL.md`** contient : objectif, quand l’utiliser, étapes, contraintes, exemples courts.
3. **Déclarer** chaque skill dans **`skills/registry.yml`** (`id`, `path`, `name`, `triggers` optionnels) pour que humains et outils puissent lister le catalogue.
4. Ne pas y mettre de **secrets** ; uniquement du savoir-faire et des procédures.

## Cycle de vie

- **Ajout** : copier `_template/SKILL.md`, remplir, ajouter une entrée dans `registry.yml`, ouvrir une PR.
- **Révision** : traiter les skills comme du code (review, versionnement Git).
- **Obsolescence** : retirer l’entrée du registre et archiver ou supprimer le dossier.

## Lien avec le code applicatif

Les skills décrivent *comment* travailler sur le repo ; le code métier reste dans `apps/`. En cas de divergence, **le code source fait foi** — mettre à jour le skill après un changement d’architecture important.
