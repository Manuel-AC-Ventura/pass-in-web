import { Search } from "lucide-react"
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from './table/table-cell';
import { MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
import { IconButton } from './icon-button';
import { TableRow } from "./table/table-row";

export const AttendeeList = ()=>{
  return(
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <div className="w-72 flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-lg text-sm">
          <Search className="size-4 text-emerald-300" />
          <input 
            type="text" 
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
          {Array.from({ length: 5 }).map((_, i)=>{
            return(
              <TableRow key={i} className="border-b border-white/10 hover:bg-white/5">
                <TableCell>
                  <input type="checkbox" className="bg-black/20 size-4 rounded border border-white/10 outline-none" />
                </TableCell>
                <TableCell>{i}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">Manuel Ventura</span>
                    <span>example@email.com</span>
                  </div>
                </TableCell>
                <TableCell>7 dias atras</TableCell>
                <TableCell>3 dias atras</TableCell>
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
            <TableCell colSpan={3}>Mostrando 5 de 228 items</TableCell>
            <TableCell colSpan={3} className="py-3 px-4 text-sm text-zinc-300 text-right">
              <div className="inline-flex gap-8 items-center">
                <span>Página 1 de 23</span>
                
                <div className="flex gap-1.5">
                  <IconButton>
                    <ChevronsLeft className="size-4"/>
                  </IconButton>
                  <IconButton>
                    <ChevronLeft className="size-4"/>
                  </IconButton>
                  <IconButton>
                    <ChevronRight className="size-4"/>
                  </IconButton>
                  <IconButton>
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