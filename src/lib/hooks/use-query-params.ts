// hooks/useQueryParams.ts
import {
  parseAsString,
  parseAsInteger,
  parseAsStringEnum,
  parseAsArrayOf,
  useQueryState,
  useQueryStates,
} from 'nuqs';

// ── Hook genérico para search + filtros ───────────────────────────
export function useQueryParams<TStatus extends string = string>(config?: {
  statusOptions?: TStatus[];
  defaultPageSize?: number;
}) {
  const { statusOptions, defaultPageSize = 25 } = config ?? {};

  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({ shallow: true, scroll: false }),
  );

  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ shallow: true, scroll: false }),
  );

  const [pageSize, setPageSize] = useQueryState(
    'limit',
    parseAsInteger
      .withDefault(defaultPageSize)
      .withOptions({ shallow: true, scroll: false }),
  );

  const [status, setStatus] = useQueryState(
    'status',
    statusOptions
      ? parseAsStringEnum<TStatus>(statusOptions).withDefault(statusOptions[0])
      : parseAsString
          .withDefault('')
          .withOptions({ shallow: true, scroll: false }),
  );

  const [sortBy, setSortBy] = useQueryState(
    'sortBy',
    parseAsString
      .withDefault('createdAt')
      .withOptions({ shallow: true, scroll: false }),
  );

  const [sortOrder, setSortOrder] = useQueryState(
    'sortOrder',
    parseAsStringEnum(['asc', 'desc'])
      .withDefault('desc')
      .withOptions({ shallow: true, scroll: false }),
  );

  // Reset página ao mudar search ou status
  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleStatus(value: TStatus | string) {
    setStatus(value as TStatus);
    setPage(1);
  }

  function handlePageSize(value: number) {
    setPageSize(value);
    setPage(1);
  }

  function toggleSort(field: string) {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setPage(1);
  }

  function reset() {
    setSearch('');
    setPage(1);
    setPageSize(defaultPageSize);
    setStatus(statusOptions?.[0] ?? '');
    setSortBy('createdAt');
    setSortOrder('desc');
  }

  // Constrói o objecto de filtros para passar à API
  const apiParams = {
    search: search || undefined,
    page,
    limit: pageSize,
    status: status || undefined,
    sortBy: sortBy || undefined,
    sortOrder: sortOrder || undefined,
  };

  return {
    // valores
    search,
    page,
    pageSize,
    status,
    sortBy,
    sortOrder,
    // setters directos
    setSearch: handleSearch,
    setPage,
    setPageSize: handlePageSize,
    setStatus: handleStatus,
    setSortOrder,
    toggleSort,
    reset,
    // pronto para passar à API / React Query
    apiParams,
  };
}
