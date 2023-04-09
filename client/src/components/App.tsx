

import { useContext, useEffect } from 'react';
import AppSidebar from '../layouts/AppSidebar';
import NoteSideBar from '../layouts/NoteSidebar';
import NoteEditor from '../layouts/NoteEditor';

import { ConfigContext } from '../context';

import '../assets/style.scss';

function App() {
  const { configs, addConfig } = useContext(ConfigContext);

  // addConfig(configs, {
  //   "key": "test",
  //   "value": "aaaa"
  // });

  const { theme } = configs;

  useEffect(() => {
    console.log(theme);
  }, []);



  return (
    <div className="App" style={theme === 'light' ? { color: '#d0d0d0' } : { color: '#7a7a7a' }} >

      <div className="container">
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
