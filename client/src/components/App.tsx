import { useEffect, useContext, useRef } from 'react'
import AppSidebar from '../layouts/AppSidebar'
import NoteSideBar from '../layouts/NoteSidebar'
import NoteEditor from '../layouts/NoteEditor'
import { ConfigContext, ResizerContext } from '../context'

import '../assets/style.scss';
import { useAppDispatch } from '../hooks/hooks'
import { getNotes } from '../store/notes/notesSlice'

function App() {
  const dispatch = useAppDispatch();
  const splitPanelElement = useRef<HTMLDivElement>(null);
  const { configs } = useContext(ConfigContext);
  const { theme } = configs;
  const {
    appSideBarDrag, noteSideBarDrag, handleAppSideBarWidth, handleNoteSideBarWidth, appSideBarWidth
  } = useContext(ResizerContext);

  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])

  const handleOnMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX } = e;

    if (appSideBarDrag) {
      const minWidth: number = 180;
      const maxWidth: number = 330;
      const newWidth: number = Math.min(Math.max(clientX, minWidth), maxWidth);

      handleAppSideBarWidth(newWidth)
    }

    if (noteSideBarDrag) {
      const minWidth: number = 250;
      const maxWidth: number = 480;
      const newNoteSideBarWidth: number = Math.min(Math.max(clientX - appSideBarWidth, minWidth), maxWidth);

      handleNoteSideBarWidth(newNoteSideBarWidth)
    }
  }

  return (
    <div className="App" style={theme === 'light' ? { color: '#d0d0d0' } : { color: '#7a7a7a' }} >

      <div className="container" onMouseMove={handleOnMouseMove}
        ref={splitPanelElement}>
        <AppSidebar />

        <div className='panel'>
          <div className='panel-split'>
            <NoteSideBar />
            <NoteEditor />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
