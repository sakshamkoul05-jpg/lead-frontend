import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { LeadFilters, LeadStatus, LeadSource } from "../../types";
import { LEAD_STATUSES, LEAD_SOURCES } from "../../constants";
import { useDebounce } from "../../hooks/useDebounce";

interface LeadFiltersBarProps {
  filters: LeadFilters;
  onFilterChange: (updates: Partial<LeadFilters>) => void;
}

const LeadFiltersBar = ({ filters, onFilterChange }: LeadFiltersBarProps) => {
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 400);

  // Only trigger filter update when debounced value changes
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFilterChange({ search: debouncedSearch });
    }
  }, [debouncedSearch]);

  const hasActiveFilters = filters.status || filters.source || filters.search;

  const clearAll = () => {
    setSearchInput("");
    onFilterChange({ search: "", status: "", source: "", sort: "latest", page: 1 });
  };

  const selectClass =
    "px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500"
        />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 placeholder-slate-400 dark:placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
      </div>

      {/* Status filter */}
      <select
        value={filters.status}
        onChange={(e) => onFilterChange({ status: e.target.value as LeadStatus | "" })}
        className={selectClass}
      >
        <option value="">All Statuses</option>
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Source filter */}
      <select
        value={filters.source}
        onChange={(e) => onFilterChange({ source: e.target.value as LeadSource | "" })}
        className={selectClass}
      >
        <option value="">All Sources</option>
        {LEAD_SOURCES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={filters.sort}
        onChange={(e) => onFilterChange({ sort: e.target.value as "latest" | "oldest" })}
        className={selectClass}
      >
        <option value="latest">Latest first</option>
        <option value="oldest">Oldest first</option>
      </select>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X size={14} />
          Clear
        </button>
      )}
    </div>
  );
};

export default LeadFiltersBar;
