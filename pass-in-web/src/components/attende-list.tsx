import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { ChangeEvent, useEffect, useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface AttendeeListProps {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

export const AttendeeList = () => {
  const [attendees, setAttendees] = useState<AttendeeListProps[]>([]);

  const [page, setpage] = useState(() => {
    const url = new URL(window.location.toString());
    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page")) ;
    }
    return 1;
  });

  const [total, setTotal] = useState(1);
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());
    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }
    return " ";

  });

  const totalPages = Math.ceil(total / 10);

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
    );

    url.searchParams.set("pageIndex", String(page - 1));

    if (search.length > 0) {
      url.searchParams.set("query", search);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees);
        setTotal(data.total);
      });
  }, [page, search]);


  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", search);
    window.history.pushState({}, "", url);
    setSearch(search);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));
    window.history.pushState({}, "", url);
    setpage(page);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  function onSearchInput(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-1.5 border border-white/10 rounded-lg  w-72 flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchInput}
            value={search}
            className="flex-1 bg-transparent outline-none border-0 p-0 text-sm focus:ring-0"
            type="text"
            placeholder="Buscar Participante..."
          />
        </div>
      </div>
      <Table>
        <thead>
          <TableRow>
            <TableHeader
              style={{ width: 48 }}
              className="py-3 px-4 font-semibold text-sm text-left"
            >
              <input
                className="size-4 bg-black/20 rounded border border-white/10 "
                type="checkbox"
              />
            </TableHeader>
            <TableHeader>Codigo </TableHeader>
            <TableHeader>Participante </TableHeader>
            <TableHeader>Data de Inscricao </TableHeader>
            <TableHeader> Data Check-In</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {attendees.map((attendees) => {
            return (
              <TableRow key={attendees.id}>
                <TableCell>
                  <input
                    className="size-4 bg-black/20 rounded border border-white/10 "
                    type="checkbox"
                  />
                </TableCell>
                <TableCell>{attendees.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {attendees.name}
                    </span>
                    <span>{attendees.email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendees.createdAt)}</TableCell>
                <TableCell>
                  {attendees.checkedInAt === null ? (
                    <span className="text-zinc-400">Nao Fez Checkin</span>
                  ) : (
                    dayjs().to(attendees.checkedInAt)
                  )}
                </TableCell>

                <TableCell>
                  <IconButton transparent={true}>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>

        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando 10 de {attendees.length}
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  {" "}
                  Pagina {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>

                  <IconButton onClick={goToPreviousPage} disabled={page == 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>

                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>

                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};
