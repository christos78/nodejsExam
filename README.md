# NodeJS Exam

1) Cloner le repo contenu le projet et y rentrer

```
git clone https://github.com/christos78/nodejsExam.git
cd nodejsExam
```

2) Installer les différentes dépendances liès à angular et au back
    
```
cd angular
npm install
cd ../back/
npm install
```
3) Se placer dans le dossier back et lancer le server web
   
```
cd back
nodemon index.js
```

4) Se placer dans angular et lancer l'interface web

```
cd angular
ng serve -o
```

5) Ecrire le nom des exchanges en miniscule séparé par une virgule pour avoir le volume journalier, des 7 derniers jours, des 30 derniers jours ainsi que le nombre de cryptos disponible sur cette plateforme. Cliquer sur le bouton ***List*** pour avoir la liste en question

```
binance,kraken,bittrex,bitfinex,bkex
```
### Note: Il faut le service mongod soit lancé sur le poste pour pouvoir  enregistrer ou faire des requetes dessus. 

6) Il est possible d'enregistrer cette liste dans mongoDB, cliquer juste sur ***Save***

7) Cliquer sur le nom d'un exchange pour avoir la liste des cryptos disponibles dessus avec son prix ainsi que le lien de redirection vers la plateforme pour trade

8) Il est également possible d'enregistrer cette liste dans mongoDB, cliquer sur ***Save Crypto***


9)  Raffrichir la page ou cliquer sur le premier bouton ***List*** pour enlever les listes affichés. On peut soliciter les données de mangoDB en appuyant sur le deuxième bouton ***List***. Toutes les valeurs présentes dans mongoDB correspondant aux listes des exchanges enregistrées précédement seront affichés avec la date à laquelle celle-ci a été enregistré

10)  Pour voir les cryptos d'une plateforme en particulier qui a été enregistré dans mongoDB, cliquer sur le nom d'un exchange. Il ne sera affiché que les 200 derniers résulats qui ont été enregistrés.
