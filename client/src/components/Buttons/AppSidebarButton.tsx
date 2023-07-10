import './style.scss'

type Props = {
  children: any,
  heading: string,
  selected: boolean,
  onClick: () => void
}

export default function AppSidebarButton({ heading, children, selected, onClick }: Props) {
  return (
    <button className={selected === true ? 'app-sidebar-wrapper selected' : 'app-sidebar-wrapper'}>
      <div className='app-sidebar-link' onClick={onClick}>
        {children}

        {heading}
      </div>
    </button>
  )
}