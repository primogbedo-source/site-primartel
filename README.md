# PRIMART'EL — site portfolio

Site vitrine de PRIMART'EL, réalisateur, cadreur et monteur (Bénin · Côte d'Ivoire).

Site **statique** : pas de framework, pas d'étape de build. Seul le dossier `public/` est mis en ligne.

## Structure

```
public/index.html    Page unique : intro, slider, bio, chiffres, collaborations, services, portfolio, contact
public/style.css     Styles (couleur or du logo : --accent dans :root)
public/script.js     Intro, menu, slider, compteurs, lightbox YouTube, formulaire (mailto)
public/images/       Photos, logo, miniatures YouTube (yt-<ID>.jpg)
public/_headers      En-têtes HTTP pour Cloudflare Pages (sécurité + cache des images)
public/robots.txt    Autorise l'indexation
```

## Déploiement

- **Code** : GitHub, branche `main`.
- **Hébergement** : Cloudflare Pages, connecté au dépôt GitHub.
  - Framework preset : `None`
  - Build command : *(vide)*
  - Build output directory : `public`
- Chaque `git push` sur `main` redéploie automatiquement le site.

## Ajouter un clip au portfolio

1. Récupérer l'ID YouTube (ce qui suit `youtu.be/` ou `watch?v=`).
2. Télécharger la miniature dans `public/images/yt-<ID>.jpg`
   (`https://img.youtube.com/vi/<ID>/maxresdefault.jpg`).
3. Dans `public/index.html`, section `#portfolio`, copier un bloc `<a class="item media" …>`
   et changer `data-youtube`, l'image et le titre.
4. Les clips sont classés par nombre de vues ; le premier a la classe `featured` (grande case).

## Tester en local

```bash
python3 -m http.server 8000 -d public
```

Puis ouvrir http://localhost:8000
