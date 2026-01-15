import "@/components/CitySelection/CitySelection.css";
import { Link } from "@/components/Link";
import { CitySearch } from "@/components/CitySearch";
import { useSearchContext } from "@/hooks/useSearchContext";
import { CitySelectionList } from "@/components/CitySelection/CitySelectionList";

export function CitySelection() {
  const { isOpen, openSearch } = useSearchContext();

  return (
    <div className="city-selection">
      <CitySelectionList />
      {isOpen ? <CitySearch /> : <Link onClick={openSearch}>Ajouter</Link>}
    </div>
  );
}
