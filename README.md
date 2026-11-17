# ACID RECALL — website

Site vitrine officiel d’ACID RECALL. Sources : https://github.com/smldms/AcidRecall_Website. Site statique prêt pour Netlify.

## Voir le site

Décompressez l'archive, puis ouvrez **index.html** dans un navigateur récent. Toutes les images, les polices et les interactions sont incluses et fonctionnent sans installation. Les liens GitHub, PayPal et de téléchargement demandent une connexion internet.

Pour un aperçu servi en local, avec Node.js 20 ou plus récent :

```sh
npm run dev
```

Ouvrez http://127.0.0.1:4173. Aucune dépendance à installer.

## Contenu

- Landing page en anglais, noir graphite, blanc cassé et vert acid.
- Nouveau logo SVG fourni par le créateur : dessin exact, marges du document recadrées et variantes blanche, noire et verte. Aucune réinterprétation du symbole.
- Capture réelle fournie par le créateur : version complète et trois recadrages WebP. Les vues détaillées ne sont pas des captures de sessions différentes.
- Galerie agrandissable : clic, fermeture par Échap, retour du focus et navigation clavier.
- Téléchargement Windows officiel, sans numéro de version inventé. Linux et macOS annoncés « Coming Soon ».
- PayPal, Bitcoin et Solana : onglets accessibles au clavier, adresses complètes, copie avec solution de repli et QR codes locaux.
- Histoire et crédits de pingw33n, des contributeurs OpenRB-338, de Matth23 et de smldms.
- Respect de `prefers-reduced-motion`, police hébergée localement, pas de suivi et pas de service externe chargé à la visite.

## Vérifications

```sh
npm run check
npm run build
```

Le résultat publiable se trouve dans `dist/`. Les vérifications contrôlent les fichiers liés, ancres, références ARIA, liens externes, syntaxe JavaScript, adresses et budget des ressources. Le dossier `validation/` documente les contrôles réalisés et les sources consultées.

Les QR codes contiennent exactement :

- `bitcoin:bc1psx8s9v3g8722chumclkgmuu6jx3mkrzdk43ryghkv5tds7urn3ds37h8rt`
- `solana:FEGRudjUfxS1Pfe4aJzx9YXkGwDP5XhTEx8isZpc1DSa`

Le checksum Bech32m et le format Taproot de l'adresse Bitcoin ont été vérifiés. L'adresse Solana se décode en une clé publique de 32 octets. Les deux QR codes ont été relus avec OpenCV. Cela vérifie les formats et le contenu des QR, pas la propriété des portefeuilles. Aucun paiement ni transfert n'a été effectué.

Lien PayPal fourni : https://paypal.me/acidrecall. Le paiement final reste à la main du visiteur.

## Déploiement GitHub et Netlify

1. Utiliser le dépôt `smldms/AcidRecall_Website`. Le dossier `dist/` est généré et ignoré par Git.
2. Dans Netlify, importer ce dépôt. La configuration `netlify.toml` définit déjà le build et le dossier publié.
3. Build : `npm run check && npm run build`. Dossier publié : `dist`. Aucun secret ni variable à ajouter.
4. Après connexion, Netlify peut déployer chaque changement de la branche principale. La liaison avec Netlify se configure dans le compte Netlify du propriétaire du dépôt.

Au build Netlify, sa variable `URL` sert à produire automatiquement la balise canonique, `og:url` et l'URL absolue de l'image Open Graph. Si vous utilisez un domaine personnalisé, vérifier le domaine principal et reconstruire. Le ZIP local garde des métadonnées relatives, puisque le futur domaine est encore inconnu.

## Maintenance

- Textes et liens : `index.html`.
- Palette, responsive et styles : `styles.css`.
- Défilement du bandeau, glitch discret et premier plan du slogan : `motion.css`.
- Réseaux sociaux : Matth23 → https://x.com/Matth23D ; smldms → https://x.com/smldms_art.
- Galerie, menu mobile et dons : `script.js`.
- Images et logos : `assets/`.
- Déploiement et en-têtes : `netlify.toml`.

Les fonctionnalités présentées concernent la preview Studio sur `feat/studio-v2`. Vérifier les nouveaux builds et le guide du logiciel avant une future publication ; le lien `windows-preview` est une preview évolutive.

## Sources et droits

Logiciel : https://github.com/smldms/Acid-Recall. Fondations : https://github.com/pingw33n/OpenRB-338. Le logiciel est sous GPL-3.0-only ; le texte de la licence est dans `LICENSE` et les crédits figurent sur la page. Le code original de ce site est également fourni sous GPL-3.0-only. Les logos et captures fournis restent les ressources de marque du projet ; leur présence ne prétend pas accorder de droits de marque.

Police Anton : SIL Open Font License, voir `assets/FONT-LICENSE.txt`.
