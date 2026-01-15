# Test technique - Exercice 2

Intégration d'une interface React avec composants personnalisés pour un formulaire de critères de recherche d'alerte immobilière.

## Choix techniques

### Stack

- **React 19** avec **TypeScript** pour le typage fort et la sécurité
- **Vite** comme build tool pour un développement rapide
- **CSS classique** (modules CSS) - pas de CSS-in-JS
- **Flexbox uniquement** pour la mise en page (pas de Grid)
- **React Query** (`@tanstack/react-query`) pour la gestion des requêtes et du cache
- **usehooks-ts** pour les hooks utilitaires (debounce, click outside)

### Architecture

#### Séparation des responsabilités

- **Context API** pour la gestion d'état UI et métier
  - `AlertFormContextProvider` : état du formulaire (villes, types de biens, type de vente)
  - `SearchContextProvider` : état de la recherche (ouverture/fermeture, texte de recherche)
- **Custom hooks** pour la logique métier réutilisable
  - `useCitySearch` : logique de recherche avec React Query
  - `useSearchContext` / `useAlertFormContext` : consommation type-safe des contexts
- **Composants fonctionnels** avec hooks React (useState, useCallback, useMemo) pour optimiser les performances

#### Performance et optimisations

- **React Query** pour la gestion des requêtes API
  - Cache automatique (5min staleTime) pour éviter les requêtes redondantes
  - Déduplication des requêtes simultanées
  - Gestion optimisée des états de chargement
  - Désactivation du refetch on window focus pour une meilleure UX
- **Context consumers via custom hooks** pour éviter les rerenders inutiles
  - Les composants consomment uniquement les valeurs nécessaires
  - Validation d'usage (erreur si utilisé hors provider)
- **Composants atomiques** : chaque composant a une responsabilité unique
  - Facilite la réutilisabilité et les tests
  - Améliore la maintenabilité du code

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
- Indicateur de chargement pendant la recherche
- Gestion du clic extérieur pour fermer le dropdown
- Affichage des villes sélectionnées sous forme de "pills" avec possibilité de suppression

**Librairie utilisée :** `@pretto/places` pour la recherche de villes françaises

**Composants :**

- `CitySearch` : Container pour l'autocomplete
  - `CitySearchInput` : Input de recherche avec indicateur de chargement
  - `CitySearchResultsList` : Liste des résultats avec gestion du clic extérieur
  - `CitySearchResult` : Item de résultat cliquable
  - `CitySearchNoResults` : Message "Aucun résultat"
- `CitySelection` : Affichage des villes sélectionnées
  - `CitySelectionList` : Liste des villes sélectionnées (pills) avec suppression
  - Bouton "Ajouter" qui ouvre le search

### Actions

- **Sauvegarder les modifications** : Affiche un `alert` confirmant la sauvegarde
- **Supprimer** : Affiche un `alert` et réinitialise le formulaire

## Refactoring - Architecture choices

### Commit 1: React Query integration

**Why:** Performance optimization for API calls

- Automatic request caching and deduplication
- Better loading state management
- Reduced network calls with 5min cache

### Commit 2: Separate search concerns

**Why:** Better separation of concerns

- `SearchContextProvider` manages UI state (open/close, search text)
- `useCitySearch` hook handles data fetching logic
- Clear boundaries between UI state and data fetching

### Commit 3: Context consumers as custom hooks

**Why:** Prevent unnecessary rerenders and improve DX

- Custom hooks (`useSearchContext`, `useAlertFormContext`) provide type safety
- Error boundaries: throws if context used outside provider
- Components only re-render when their consumed values change

### Commit 4: Component splitting

**Why:** Improved maintainability and testability

- `PropertyTypeSelection`, `SaleTypeSelection`, `AlertFormActions` extracted from `AlertForm`
- Each component has single responsibility
- Easier to test and maintain

### Commit 5: Utilities and cleanup

**Why:** Code reuse and cleaner dependencies

- `utils.ts` with `cn()` for className composition and `formatCityLabel()`
- Removed custom hooks replaced by `usehooks-ts` library
- Cleaner imports without barrel exports

## Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── AlertForm/     # Formulaire d'alerte
│   │   ├── PropertyTypeSelection.tsx
│   │   ├── SaleTypeSelection.tsx
│   │   └── AlertFormActions.tsx
│   ├── CitySearch/    # Autocomplete de recherche
│   │   ├── CitySearchInput.tsx
│   │   ├── CitySearchResultsList.tsx
│   │   └── CitySearchResult.tsx
│   ├── CitySelection/ # Gestion des villes sélectionnées
│   └── ...
├── contexts/          # Context API providers
│   ├── AlertFormContextProvider.tsx
│   └── SearchContextProvider.tsx
├── hooks/             # Custom hooks
│   ├── useCitySearch.ts      # Logique de recherche (React Query)
│   ├── useSearchContext.ts   # Consumer SearchContext
│   └── useAlertFormContext.ts # Consumer AlertFormContext
├── lib/               # Utilitaires et types
│   ├── utils.ts
│   ├── types.ts
│   └── constants.ts
└── App.tsx            # Point d'entrée avec providers
```

## Installation

```bash
npm install
npm run dev
```
