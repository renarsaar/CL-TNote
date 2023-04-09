import './style.scss'

type Props = {
  children: any,
  heading: string,
  onClick: () => void
}

export default function AppSidebarButton({ heading, children, onClick }: Props) {
  return (
    <button className='app-sidebar-wrapper'>
      <div className='app-sidebar-link' onClick={onClick}>
        {children}

        {heading}
      </div>
    </button>
  )
}