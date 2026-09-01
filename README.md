# Projet de démonstration — QA Automation

Ce dépôt montre concrètement ce qui est livré en début de mission : une
suite de tests automatisés qui couvre les parcours qui font gagner ou
perdre de l'argent à un produit, plus le pipeline CI/CD qui les exécute
à chaque changement de code.

## Ce qui est testé

Trois parcours critiques d'une boutique en ligne (application de démo
incluse dans `app/`, inspirée d'un catalogue e-commerce classique) :

- **Authentification** — un compte valide passe, un mot de passe
  erroné et un compte bloqué sont rejetés avec le bon message.
- **Panier et paiement** — le parcours complet ajout au panier →
  commande → confirmation fonctionne, et le formulaire de livraison
  refuse bien une commande incomplète.
- **Tri du catalogue** — le tri par prix (croissant/décroissant) est
  vérifié programmatiquement plutôt qu'à l'œil : c'est exactement le
  type de régression silencieuse qu'une vérification manuelle finit
  par laisser passer.

8 tests, tous verts. Rapport de la dernière exécution : `report-screenshot.png`
(version interactive complète dans `playwright-report/index.html`,
à ouvrir dans un navigateur).

## Comment ça s'intègre chez un client

- `.github/workflows/playwright.yml` : le pipeline GitHub Actions qui
  relance cette suite à chaque push/pull request, avec le rapport
  publié en pièce jointe du build.
- Architecture en Page Objects (`tests/pages/`) : quand l'interface du
  client change, on corrige un seul fichier plutôt que de retoucher
  chaque test un par un — c'est ce qui rend la maintenance tenable une
  fois la suite plus grande.
- Le projet cible ici une application de démonstration locale pour que
  n'importe qui puisse l'exécuter sans dépendance externe ; en mission,
  `playwright.config.ts` pointe simplement vers l'environnement de
  recette ou de staging du client.

## Lancer le projet

```bash
npm install
npx playwright install --with-deps chromium
npx playwright test
npx playwright show-report
```
