import { forwardRef } from "react";
import { LoadingSpinner } from "@/components/Icons";
import "./CitySearch.css";

type CitySearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
};

export const CitySearchInput = forwardRef<
  HTMLInputElement,
  CitySearchInputProps
>(
  (
    {
      value,
      onChange,
      onKeyDown,
      isLoading = false,
      placeholder = "Rechercher une ville...",
      className = "",
    },
    ref
  ) => {
    return (
      <div className={`city-search__input-wrapper ${className}`.trim()}>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="city-search__input"
        />
        {isLoading && (
          <LoadingSpinner
            className="city-search__loading"
            aria-label="Loading"
          />
        )}
      </div>
    );
  }
);

CitySearchInput.displayName = "CitySearchInput";
