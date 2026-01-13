# Test technique - Exercice 2

Intégration d'une interface React avec composants personnalisés pour un formulaire de critères de recherche d'alerte immobilière.

## Choix techniques

### Stack

- **React 19** avec **TypeScript** pour la typage fort et la sécurité
- **Vite** comme build tool pour un développement rapide
- **CSS classique** (modules CSS) - pas de CSS-in-JS
- **Flexbox uniquement** pour la mise en page (pas de Grid)

### Architecture

- **Context API** (`AlertFormContext`) pour la gestion centralisée de l'état du formulaire
- **Custom hooks** (`useAlertForm`, `useDebounce`) pour la réutilisabilité de la logique
- **Composants fonctionnels** avec hooks React (useState, useCallback, useMemo) pour optimiser les performances

### Composants personnalisés

#### Checkbox

Composant réutilisable avec état visuel personnalisé (checkmark SVG). Gère l'état checked/unchecked via props.

#### Radio

Composant réutilisable avec style personnalisé (cercle avec point central). Gère la sélection exclusive via le name group.

### Sélection de ville

**Choix UX/UI : Autocomplete avec dropdown**

Le composant `CitySearch` implémente un autocomplete avec les fonctionnalités suivantes :

- Recherche en temps réel avec debounce (300ms) pour limiter les appels API
- Dropdown de résultats positionné sous l'input
- Navigation au clavier (flèches haut/bas, Enter pour sélectionner, Escape pour fermer)
- Indicateur de chargement pendant la recherche
- Gestion du clic extérieur pour fermer le dropdown
- Affichage des villes sélectionnées sous forme de "pills" avec possibilité de suppression

**Librairie utilisée :** `@pretto/places` pour la recherche de villes françaises

**Composants :**

- `CitySearch` : Autocomplete avec recherche et affichage des résultats
- `CitySelection` : Affichage des villes sélectionnées (pills) + bouton "Ajouter" qui ouvre le search

### Actions

- **Sauvegarder les modifications** : Affiche un `alert` confirmant la sauvegarde
- **Supprimer** : Affiche un `alert` et réinitialise le formulaire

## Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Checkbox/      # Composant checkbox personnalisé
│   ├── Radio/         # Composant radio personnalisé
│   ├── CitySearch/    # Autocomplete de recherche de ville
│   ├── CitySelection/ # Affichage et gestion des villes sélectionnées
│   └── ...
├── contexts/          # Context API pour l'état global
├── hooks/             # Custom hooks réutilisables
└── App.tsx            # Point d'entrée de l'application
```

## Installation

```bash
npm install
npm run dev
```
