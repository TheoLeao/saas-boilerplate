# Skills IA (agents)

Ce répertoire contient les **skills** — instructions structurées pour les agents IA qui travaillent sur ce dépôt.

## Registre

Le fichier **`registry.yml`** liste tous les skills (id, chemin, nom, triggers). À mettre à jour à chaque ajout ou retrait.

## Ajouter un skill

1. Dupliquer `skills/_template/SKILL.md` vers `skills/<nom>/SKILL.md`.
2. Remplir les sections (objectif, déclencheurs, procédure, garde-fous).
3. Ajouter une entrée dans `registry.yml`.
4. Lier depuis `docs/architecture/ai-skills.md` si le skill est stratégique.

## Référence humaine

La gouvernance (cycle de vie, pas de secrets) est décrite dans :

`docs/architecture/ai-skills.md`
