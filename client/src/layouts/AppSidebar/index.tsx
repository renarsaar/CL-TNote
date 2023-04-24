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

export default function AppSideBar({ }: Props) {
  const { appSideBarWidth } = useContext(ResizerContext);

  return (
    <>
      <aside className='app-sidebar' style={{ width: appSideBarWidth }}>
        <NewNoteButton />

        <section>
          <AppSidebarButton heading='Scratchpad' onClick={toggleScratchpad}>
            <ScratchpadIcon />
          </AppSidebarButton>

          <AppSidebarButton heading='Notes' onClick={toggleNotes}>
            <NoteIcon />
          </AppSidebarButton>

          <AppSidebarButton heading='Favorites' onClick={toggleFavorites}>
            <FavoritesIcon />
          </AppSidebarButton>

          <AppSidebarButton heading='Trash' onClick={toggleTrash}>
            <TrashIcon />
          </AppSidebarButton>

          <Categories />
        </section>
      </aside>

      <Resizer component='AppSideBar' />
    </>
  )
}