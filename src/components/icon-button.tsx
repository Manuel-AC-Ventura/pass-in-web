import { ComponentProps } from "react"
import { twMerge } from 'tailwind-merge';

interface IconButtonProps extends ComponentProps<'button'>{
  transparent?: boolean
}

export const IconButton = ({ transparent, ...props }: IconButtonProps) => {
  return (
    <button 
      {...props} 
      className={twMerge(
        'p-1.5 border border-white/10 rounded-md',
        transparent ? 'bg-black/20' : 'bg-white/10',
        props.disabled ? 'opacity-50 cursor-not-allowed' : null
      )}
    />
  )
}
