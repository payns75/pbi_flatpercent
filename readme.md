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
- Activer/désactiver animations ?
- Option de décalage des animations si plusieurs contrôles ?
- Titre custom & style du titre + font Fira, option titre au dessus ou en dessous -> limite sur une seule ligne -> Saisie du titre dans les options ?
- Quid valeur null/infiniie NAN ? -> Texte de remplacement ?
- Option afficher text interieur option ?
- Options afficher ou non unité % / autre
- Nettoyage code / réorganisation
- Multilingue, Fichier des libellés text / Internationalization (i18n)
- Ajout d'une icone de contrôle
- Revoir le fichier de configuration pbiviz.json à configurer correctement ?
- Publier sur le store -> quid de la licence / propriétaire
- Ajout d'une bulle d'aide de description à coté du titre
- Arrondi supperieur ou inferieur, et décimals ?
- Revoir police text roboto trop grossière ? --> Liste déroulante d'option de choix ? Garder la police par défaut ?
- Pour les paramètres voir comment mettre des valeur min/max, listes déroulantes, descriptions etc
- Revoir pour recentrer le texte
- Couleur de texte et couleur de gauge à séparer
- 2 mesures de seuil pour la gestion des VOR
- VOR sur le texte 3 couleurs, si pas de mesures de seuil, avoir une valeur par défaut
- Bug l'animation ne commence pas toujours à 0
- Définir les descriptions des propriétés.

# Questions

- Comment récupérer les paramètres par défaut des options comme le title, le border etc
- Sur les options, comment cacher/désactiver des options en fonctions d'autres options
- Comment définir des valeurs min/max
- Comment gérer le multilingue
- Voir commment configurer le launcher pour exécuter le débug direct sur chrome
- Le répertoire .temp n'est pas exclus par gitignore
- Voir l'utilisation des tooltips dans le capabilities.json

# Liens utiles
- https://tsmatz.wordpress.com/2016/09/27/power-bi-custom-visuals-programming/
- https://github.com/Microsoft/PowerBI-visuals#developing-your-first-powerbi-visual
- https://community.powerbi.com/t5/Developer/custom-visual-enumeration-issues/m-p/146866
- https://community.powerbi.com/t5/Custom-Visuals-Development/disable-custom-objects-properties/m-p/307773