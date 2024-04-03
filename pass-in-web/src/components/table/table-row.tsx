import { ComponentProps } from "react"

interface TableRowprops extends ComponentProps <'tr'>{}

export const TableRow = (props:TableRowprops) => {
    return(
        <tr {...props} className="border-white/10  border-b hover:bg-white/5" />
    )
}