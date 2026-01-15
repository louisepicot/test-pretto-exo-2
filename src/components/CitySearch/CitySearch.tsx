import { CitySearchInput } from "@/components/CitySearch/CitySearchInput";
import { CitySearchResultsList } from "@/components/CitySearch/CitySearchResultsList";
import "@/components/CitySearch/CitySearch.css";

export function CitySearch() {
  return (
    <div className="city-search">
      <CitySearchInput />
      <CitySearchResultsList />
    </div>
  );
}
