import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { IconButton } from "./icon-button";
import {Table} from "./table/table"
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { attendees } from "../data/attendees";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import 'dayjs/locale/pt-br'
import { useState } from "react";


dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export const AttendeeList = () => {

const [page,setpage] = useState(1)

const totalPages = Math.ceil(attendees.length/10)

function goToNextPage (){
  setpage(page + 1)
}

function goToPreviousPage (){
  setpage(page - 1)
}

function goToFirstPage (){
  setpage(1)
}


function goToLastPage (){
  setpage(totalPages)
}


  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-1.5 border border-white/10 rounded-lg  w-72 flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="flex-1 bg-transparent outline-none border-0 p-0 text-sm"
            type="text"
            placeholder="Buscar Participante..."
          />
        </div>
      </div>
        <Table>
          <thead>
            <TableRow >
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
            {attendees.slice((page - 1) * 10, page * 10).map((attendees) => {
              return (
                <TableRow key={attendees.id} >
                  <TableCell >
                    <input
                      className="size-4 bg-black/20 rounded border border-white/10 "
                      type="checkbox"
                    />
                  </TableCell>
                  <TableCell >{attendees.id}</TableCell>
                  <TableCell >
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">{attendees.name}</span>
                      <span>{attendees.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(attendees.createdAt)}</TableCell>
                  <TableCell>{dayjs().to(attendees.checkedInAt)}</TableCell>
             
               
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
            <tr >
              <TableCell colSpan={3}>
                Mostrando 10 de {attendees.length}
              </TableCell>
              <TableCell className="text-right" colSpan={3} >
                <div className="inline-flex items-center gap-8">
                  <span> Pagina {page} de {totalPages}</span>
                  <div className="flex gap-1.5">
                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                      <ChevronsLeft className="size-4" />
                    </IconButton>

                    <IconButton onClick={goToPreviousPage} disabled={page==1}>
                      <ChevronLeft className="size-4" />
                    </IconButton>

                    <IconButton onClick={goToNextPage} disabled={page === totalPages} >
                      <ChevronRight className="size-4" />
                    </IconButton>

                    <IconButton onClick={goToLastPage} disabled={page === totalPages}>
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
