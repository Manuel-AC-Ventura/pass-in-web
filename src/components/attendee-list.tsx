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
import { ChangeEvent, useEffect, useState } from "react";

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Attendees{
  id: string,
  name: string,
  email: string,
  createdAt: string,
  checkedInAt: string | null
}

export const AttendeeList = ()=>{
  const [search, setSearch] = useState(()=>{
    const url = new URL(window.location.toString())
    
    if(url.searchParams.has('search')){
      return url.searchParams.get('search') ?? ''
    }
    return '';
  })
  const [page, setPage] = useState(()=>{
    const url = new URL(window.location.toString())
    
    if(url.searchParams.has('page')){
      return Number(url.searchParams.get('page'));
    }
    return 1;
  })

  const [total, setTotal] = useState(0)
  const [attendees, setAttendees] = useState<Attendees[]>([]);
  const totalPages = Math.ceil(total / 5)

  useEffect(()=>{
    const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees?')
    url.searchParams.set('pageIndex', String(page -1))

    if(search.length > 0){
      url.searchParams.set('query', search)
    }

    fetch(url)
    .then(req=>req.json())
    .then(res => {
      setAttendees(res.attendees)
      setTotal(res.total)
    })
  }, [page, search])


  function setCurrentSearch(search: string){
    const url = new URL(window.location.toString())
    url.searchParams.set('search', search)
    
    window.history.pushState({}, '', url)
    setSearch(search)
  }

  function setCurrentPage(page: number){
    const url = new URL(window.location.toString())
    url.searchParams.set('page', String(page))
    
    window.history.pushState({}, '', url)
    setPage(page)
  }

  function onSearchInputChanged(event:ChangeEvent<HTMLInputElement>){
    setCurrentSearch(event.target.value)
    console.log(event.target.value)
  }

  function goToFirstPage(){
    setCurrentPage(1)
  }

  function goToPeviewsPage(){
    setCurrentPage(page-1)
  }

  function goToNextPage(){
    setCurrentPage(page +1)
  }

  function goToLastPage(){
    setCurrentPage(totalPages)
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
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
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
          {attendees.map((attendee)=>{
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
                <TableCell>
                  {attendee.checkedInAt === null ? 
                    <span className="text-zinc-400">Não fez check-in</span>
                    : dayjs().to(attendee.checkedInAt)
                  }
                </TableCell>
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
            <TableCell colSpan={3}>Mostrando {attendees.length} de {total} items</TableCell>
            <TableCell colSpan={3} className="py-3 px-4 text-sm text-zinc-300 text-right">
              <div className="inline-flex gap-8 items-center">
                <span>Página {page} de {totalPages}</span>
                
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPeviewsPage} disabled={page === 1}>
                    <ChevronLeft className="size-4"/>
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                    <ChevronRight className="size-4"/>
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                    <ChevronsRight className="size-4"/>
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