import {Search,MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight} from "lucide-react"

export const AttendeeList = () => {
    return (

        <div className="flex flex-col gap-4"> 
            <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Participantes</h1>
            <div className="px-3 py-1.5 border border-white/10 rounded-lg  w-72 flex items-center gap-3"  >
                
                <Search className="size-4 text-emerald-300"/>
                <input className="flex-1 bg-transparent outline-none border-0 p-0 text-sm"  type="text" placeholder="Buscar Participante..." />


                </div>

            </div>

            <div className="border border-x-white/10 rounded-lg">

            <table className="w-full ">
                <thead>
                    <tr className="border-white/10  border-b">
                         <th style={{width:48}}  className="py-3 px-4 font-semibold text-sm text-left"><input className="size-4 bg-black/20 rounded border border-white/10 " type="checkbox"/></th>
                         <th className="py-3 px-4 font-semibold text-sm text-left">Codigo</th>
                         <th className="py-3 px-4 font-semibold text-sm text-left">Participante</th>
                         <th className="py-3 px-4 font-semibold text-sm text-left">Data de Inscricao</th>
                         <th className="py-3 px-4 font-semibold text-sm text-left">Data Check-In</th>
                         <th  style={{width:64}} className="py-3 px-4 font-semibold text-sm text-left"></th>  
                    </tr>
                </thead>
                <tbody>

                    {Array.from({length:8}).map((_,i) => {
                        return(
                            <tr key={i} className="border-white/10  border-b">
                    <td className="py-3 px-4  text-sm text-zinc-300"><input className="size-4 bg-black/20 rounded border border-white/10 " type="checkbox"/></td>
                    <td className="py-3 px-4  text-sm text-zinc-300">54154155</td>
                    <td className="py-3 px-4  text-sm text-zinc-300">
                        <div className="flex flex-col gap-1"> 
                            <span className="font-semibold text-white">Adriano</span>
                            <span>Adriano@gmail.com</span>
                        </div>
                    </td>
                    <td className="py-3 px-4  text-sm text-zinc-300">7 dias  atras</td>

                    <td className="py-3 px-4  text-sm text-zinc-300">3 dias  atras</td>
                    <td className="py-3 px-4  text-sm text-zinc-300">
                            <button className="bg-black/20 border border-white/10 p-1.5"> 
                            <MoreHorizontal className="size-4" />

                            </button>
                    </td>
                    </tr>
                        )
                    })}
                </tbody>
                 <tfoot>
                    <tr className="border-white/10  border-b">
                        <td className="py-3 px-4  text-sm text-zinc-300" colSpan={3}>
                            Mostrando 10 de 228 itens
                        </td>
                        <td className="py-3 px-4  text-sm text-zinc-300 text-right"  colSpan={3}>
                            
                            
                        

                                        <div className="inline-flex items-center gap-8">
                                            <span> Pagina 1 de 23</span>
                                        <div className="flex gap-1.5">
                                <button className="bg-black/10 border border-white/10 p-1.5"> 
                                    <ChevronsLeft className="size-4" />
                                    </button>

                                    <button className="bg-black/10 border border-white/10 p-1.5"> 
                                    <ChevronLeft className="size-4" />
                                    </button>

                                    <button className="bg-black/10 border border-white/10 p-1.5"> 
                                    <ChevronRight className="size-4" />
                                    </button>

                                    <button className="bg-black/10 border border-white/10 p-1.5"> 
                                    <ChevronsRight className="size-4" />
                                    </button>
                                </div>
                                        </div>
                               
                        </td>

                    </tr>
                </tfoot>

            </table>
            </div>
        </div>
    )

}