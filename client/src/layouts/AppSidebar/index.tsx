import { useContext } from 'react'
import { ResizerContext } from '../../context';

import ScratchpadIcon from '../../components/Icons/ScratchpadIcon';
import NoteIcon from '../../components/Icons/NoteIcon';
import FavoritesIcon from '../../components/Icons/FavoritesIcon';
import TrashIcon from '../../components/Icons/TrashIcon';
import AppSidebarButton from '../../components/Buttons/AppSidebarButton';
import NewNoteButton from '../../components/Buttons/NewNoteButton';
import Categories from '../../components/Categories';
import Resizer from '../../components/Reziser';

import './style.scss';

type Props = {}

const toggleScratchpad = () => {
  console.log('scratchpad')
}

const toggleNotes = () => {
  console.log('notes')
}

const toggleFavorites = () => {
  console.log('favorites')
}

const toggleTrash = () => {
  console.log('trash')
}

const AppSideBar = ({ }: Props) => {
  const { appSideBarWidth } = useContext(ResizerContext);

  return (
    <>
      <aside className='app-sidebar' style={{ width: appSideBarWidth }}>
        <NewNoteButton />

        <section>
          <AppSidebarButton heading='Scratchpad' onClick={toggleScratchpad}>
            <ScratchpadIcon className='app-sidebar-icon' width={15} height={15} />
          </AppSidebarButton>

          <AppSidebarButton heading='Notes' onClick={toggleNotes}>
            <NoteIcon className='app-sidebar-icon' width={15} height={15} />
          </AppSidebarButton>

          <AppSidebarButton heading='Favorites' onClick={toggleFavorites}>
            <FavoritesIcon className='app-sidebar-icon' width={15} height={15} />
          </AppSidebarButton>

          <AppSidebarButton heading='Trash' onClick={toggleTrash}>
            <TrashIcon className='app-sidebar-icon' width={15} height={15} />
          </AppSidebarButton>

          <Categories />
        </section>
      </aside>

      <Resizer component='AppSideBar' />
    </>
  )
}

export default AppSideBar