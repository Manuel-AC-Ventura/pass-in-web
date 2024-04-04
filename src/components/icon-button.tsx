import { ComponentProps } from "react"

interface IconButtonProps extends ComponentProps<'button'>{
  transparent?: boolean
}

export const IconButton = ({ transparent, ...props }: IconButtonProps) => {
  return (
    <button 
      {...props} 
      className={transparent 
        ? "bg-black/20 p-1.5 border border-white/10 rounded-md" 
        : "bg-white/10 p-1.5 border border-white/10 rounded-md"
      } 
    />
  )
}
