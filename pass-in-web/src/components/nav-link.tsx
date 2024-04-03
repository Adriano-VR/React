import { ComponentProps } from "react"

interface NavLinkProps extends ComponentProps<'a'>{}
 

export function NavLink(props:NavLinkProps) {

    return (
        <a {...props} className="font-medium text-sm text-zinc-300">
            {/* {props.children} */}
        </a>
    )
}