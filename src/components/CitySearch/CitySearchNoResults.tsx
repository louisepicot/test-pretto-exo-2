import "./CitySearch.css";

type CitySearchNoResultsProps = {
  className?: string;
};

export function CitySearchNoResults({
  className = "",
}: CitySearchNoResultsProps) {
  return (
    <div className={`city-search__no-results ${className}`.trim()}>
      Aucun résultat trouvé
    </div>
  );
}
