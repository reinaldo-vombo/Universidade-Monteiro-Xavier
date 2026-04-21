import {
  useQueryState,
  parseAsString,
  parseAsStringEnum,
  parseAsBoolean,
  parseAsInteger,
} from 'nuqs';
import { STATUS_OPTIONS } from '../../constants/exames';

// const STATUS_OPTIONS = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const;

export function useExameFilters() {
  // 🔎 search (com debounce já configurado)
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({
      scroll: false,
      limitUrlUpdates: {
        timeMs: 500,
        method: 'throttle',
      },
    }),
  );

  // 📄 exame
  const [exameId, setExameId] = useQueryState(
    'exameId',
    parseAsString.withDefault('').withOptions({
      shallow: true,
      scroll: false,
    }),
  );

  // 📊 status
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum([...STATUS_OPTIONS])
      .withDefault('ALL')
      .withOptions({ shallow: true, scroll: false }),
  );

  // ✅ aprovado
  const [passed, setPassed] = useQueryState(
    'passed',
    parseAsBoolean.withDefault(false).withOptions({
      shallow: true,
      scroll: false,
    }),
  );

  // 📑 paginação
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({
      shallow: true,
      scroll: false,
    }),
  );

  // 🔄 reset página quando filtros mudam
  const setSearchAndReset = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const setStatusAndReset = (value: typeof status) => {
    setStatus(value);
    setPage(1);
  };

  const setPassedAndReset = (value: boolean | null) => {
    setPassed(value);
    setPage(1);
  };

  const setExameAndReset = (value: string) => {
    setExameId(value);
    setPage(1);
  };

  const resetAll = () => {
    setSearch('');
    setStatus('ALL');
    setPassed(false);
    setExameId('');
    setPage(1);
  };

  return {
    // values
    search,
    exameId,
    status,
    passed,
    page,

    // setters normais
    setPage,

    // setters com reset
    setSearch: setSearchAndReset,
    setStatus: setStatusAndReset,
    setPassed: setPassedAndReset,
    setExameId: setExameAndReset,

    // utils
    resetAll,
  };
}
