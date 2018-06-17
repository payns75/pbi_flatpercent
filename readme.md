# Installation packages
- npm i

## Start server
- pbiviz start

## Créer un package
- pbiviz package

## Créer un projet (pour info)
- pbiviz new myTestVisual

## Tslint
- Installer l'extension tslint
- tslint --init initialise la conf si le fichier tslint.json n'existe pas et se base sur les rules de microsoft. Non utilisé ici car trops de contraintes pour le momment...
- https://basarat.gitbooks.io/typescript/docs/styleguide/styleguide.html

## Chrome debug
- Activer le certificat pour le localhost : chrome://flags/#allow-insecure-localhost
- Installer l'extension chrome
- /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
- https://powerbi.microsoft.com/fr-fr/

# TODOS
- Titre custom & style du titre + font Fira, option titre au dessus ou en dessous -> limite sur une seule ligne -> Saisie du titre dans les options ?
- Texte intérieur, pouvoir sélectionner une font
- Nettoyage code / réorganisation
- Multilingue, Fichier des libellés text / Internationalization (i18n)
- Ajout d'une icone de contrôle
- Revoir le fichier de configuration pbiviz.json à configurer correctement ?
- Publier sur le store -> quid de la licence / propriétaire
- Ajout d'une bulle d'aide de description à coté du titre
- Arrondi supperieur ou inferieur, et décimals ?
- 2 mesures de seuil pour la gestion des VOR
- Définir les descriptions des propriétés.
- Définir les noms des priorités pour la localization
- Configurer les champs de mesure correctement pour 1 seule valeur (min pour la mesure principale), et récupérer la bonne valeur --> cf doc
- Quid si plusieurs catégory séléctionnés ? Possible ?

# Idées pour plus tard
- Option de décalage des animations si plusieurs contrôles ?
- Police text roboto  ? --> Utiiliser des fonts externes ? Les inclures dans le package.
- Mettre le suffixe % plus petit que la valeur ?

# Questions

- Comment récupérer les paramètres par défaut des options comme le title, le border etc
- Sur les options, comment cacher/désactiver des options en fonctions d'autres options
- Comment définir des valeurs min/max
- Voir commment configurer le launcher pour exécuter le débug direct sur chrome
- Le répertoire .temp n'est pas exclus par gitignore
- Voir l'utilisation des tooltips dans le capabilities.json
- Pour les paramètres voir comment mettre des valeur min/max, listes déroulantes, descriptions etc
- La localisation en-US n'a pas d'intéret car cela doit rester la valeur par défaut -> bien configurer capabilities.json pour cela.

# Liens utiles
- https://tsmatz.wordpress.com/2016/09/27/power-bi-custom-visuals-programming/
- https://github.com/Microsoft/PowerBI-visuals#developing-your-first-powerbi-visual
- https://community.powerbi.com/t5/Developer/custom-visual-enumeration-issues/m-p/146866
- https://community.powerbi.com/t5/Custom-Visuals-Development/disable-custom-objects-properties/m-p/307773
- https://microsoft.github.io/PowerBI-visuals/docs/latest/concepts/capabilities/