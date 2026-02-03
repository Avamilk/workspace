interface Props {
  children: React.ReactNode
  color?: 'green' | 'amber' | 'red'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function LEDText({ children, color = 'green', size = 'md' }: Props) {
  const colors = {
    green: 'text-led-green',
    amber: 'text-led-amber',
    red: 'text-led-red',
  }

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl',
    xl: 'text-4xl',
  }

  return (
    <span className={`font-led tracking-wider ${colors[color]} ${sizes[size]}`}
          style={{ textShadow: '0 0 5px currentColor, 0 0 10px currentColor' }}>
      {children}
    </span>
  )
}
