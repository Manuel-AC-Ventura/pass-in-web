import { Search } from "lucide-react"
import { Table } from "./table/table";
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import relativeTime from "dayjs/plugin/relativeTime"
import { TableHeader } from "./table/table-header";
import { TableCell } from './table/table-cell';
import { MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
import { IconButton } from './icon-button';
import { TableRow } from "./table/table-row";
import { ChangeEvent, useState } from "react";
import { Attendees } from "../data/attendees";

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export const AttendeeList = ()=>{
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const totalPages = (Math.ceil(Attendees.length) / 5)

  function onSearchInputChanged(event:ChangeEvent<HTMLInputElement>){
    setSearch(event.target.value)
    console.log(event.target.value)
  }

  function goToFirstPage(){
    setPage(1)
  }

  function goToPeviewsPage(){
    setPage(page-1)
  }

  function goToNextPage(){
    setPage(page+1)
  }

  function goToLastPage(){
    setPage(totalPages)
  }

  return(
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <div className="w-72 flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-lg text-sm">
          <Search className="size-4 text-emerald-300" />
          <input 
            type="text"
            value={search}
            onChange={onSearchInputChanged}
            placeholder="Buscar participante..."
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
          />
        </div>
      </div>

      <Table>
        <thead>
          <TableRow className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
            <input type="checkbox" className="bg-black/20 size-4 rounded border border-white/10 outline-none" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </TableRow>
        </thead>  
        <tbody>
          {Attendees.slice((page - 1)* 5, page * 5).map((attendee)=>{
            return(
              <TableRow key={attendee.id} className="border-b border-white/10 hover:bg-white/5">
                <TableCell>
                  <input type="checkbox" className="bg-black/20 size-4 rounded border border-white/10 outline-none" />
                </TableCell>
                <TableCell>{attendee.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">{attendee.name}</span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4"/>
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>
        <tfoot>
          <TableRow>
            <TableCell colSpan={3}>Mostrando 5 de {Attendees.length} items</TableCell>
            <TableCell colSpan={3} className="py-3 px-4 text-sm text-zinc-300 text-right">
              <div className="inline-flex gap-8 items-center">
                <span>Página {page} de {totalPages}</span>
                
                <div className="flex gap-1.5">
                  <IconButton>
                    <ChevronsLeft onClick={goToFirstPage} className="size-4"/>
                  </IconButton>
                  <IconButton>
                    <ChevronLeft onClick={goToPeviewsPage} className="size-4"/>
                  </IconButton>
                  <IconButton>
                    <ChevronRight onClick={goToNextPage} className="size-4"/>
                  </IconButton>
                  <IconButton>
                    <ChevronsRight onClick={goToLastPage} className="size-4"/>
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  )
}