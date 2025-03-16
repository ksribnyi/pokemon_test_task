import React, { useEffect, useRef, useState } from 'react';
import Badge from './Badge';

interface SelectProps {
  itemsList: SelectItem[];
  selectedItems: SelectItem[];
  setSelectedItem: (items: SelectItem[]) => void;
  label: string;
  secondaryLabel?: string;
  error?: string;
  helperText?: string;
  description?: string;
  disabled?: boolean;
}

export interface SelectItem {
  name: string;
  url: string;
}

const Select: React.FC<SelectProps> = ({
  itemsList,
  selectedItems,
  setSelectedItem,
  label,
  secondaryLabel,
  error,
  helperText,
  description,
  disabled = false,
}) => {
  const [search, setSearch] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (item: SelectItem) => {
    if (selectedItems.length < 4) {
      setSelectedItem([...selectedItems, item]);
      setSearch('');
    }
  };

  const handleRemove = (item: SelectItem) => {
    setSelectedItem(selectedItems.filter((i) => i.name !== item.name));
  };

  const handleRemoveAll = () => {
    setSelectedItem([]);
  };

  return (
    <div
      className={`relative space-y-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      ref={dropdownRef}
    >
      <label className="block text-sm font-medium flex justify-between w-100">
        <span className="flex items-center gap-2">
          {label}
          {description && (
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setShowDescription(true)}
              onMouseLeave={() => setShowDescription(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
              {showDescription && (
                <div className="absolute left-0 bottom-5 mt-1 p-2 max-w-md min-w-40 bg-white border border-gray-300 rounded-sm shadow-lg z-10">
                  {description}
                </div>
              )}
            </div>
          )}
        </span>
        <span className="text-gray-500 text-sm">{secondaryLabel}</span>
      </label>
      <div
        className={`relative w-100 h-8 border rounded-sm px-2 py-3 flex items-center gap-8 overflow-hidden bg-white transition-all
                    ${disabled ? 'border-gray-300 cursor-not-allowed' : 'border-gray-300 hover:border-violet-700 focus-within:border-violet-700 cursor-pointer'}
                    ${isDropdownOpen ? 'border-violet-700' : ''}`}
        onClick={() => {
          if (!disabled) {
            setIsDropdownOpen(true);
            searchInputRef.current?.focus();
          }
        }}
      >
        <div className="flex items-center space-x-2 overflow-hidden whitespace-nowrap w-85 box-border">
          {selectedItems.map((item) => (
            <Badge
              key={item.name}
              value={item.name}
              markX={!disabled}
              color={'gray'}
              handleClick={!disabled ? () => handleRemove(item) : undefined}
              rounded={'rounded-full'}
            />
          ))}
          {!selectedItems.length && (
            <div className="text-gray-500 text-sm ml-2">Select</div>
          )}
        </div>
        <div className="absolute right-0 flex items-center justify-end mr-3 w-8 h-6">
          {selectedItems.length > 0 && !disabled && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-4"
              onClick={handleRemoveAll}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.1}
            stroke="currentColor"
            className={`size-4 ${disabled ? 'opacity-50' : ''}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isDropdownOpen
                  ? 'm4.5 15.75 7.5-7.5 7.5 7.5'
                  : 'm19.5 8.25-7.5 7.5-7.5-7.5'
              }
            />
          </svg>
        </div>
      </div>
      {error && (
        <span className="text-xs text-red-500 absolute top-16 left-0">
          {error}
        </span>
      )}
      {helperText && <p className="text-sm text-gray-500">{helperText}</p>}
      {isDropdownOpen && !disabled && (
        <div className="absolute w-100 bg-white border border-gray-300 max-h-auto overflow-auto mt-1 shadow-lg rounded-md p-2 z-10">
          <input
            ref={searchInputRef}
            type="text"
            className="w-full p-2 border-b border-gray-300 outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            onFocus={() => setIsDropdownOpen(true)}
          />
          <div className="max-h-32 overflow-y-auto">
            {itemsList.map((item) => (
              <div
                key={item.name}
                className={`p-2 cursor-pointer ${
                  selectedItems.some((i) => i.name === item.name)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'hover:bg-gray-200'
                }`}
                onClick={() =>
                  !selectedItems.some((i) => i.name === item.name) &&
                  handleSelect(item)
                }
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
