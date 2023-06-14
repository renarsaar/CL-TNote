import { createContext, FC, ReactElement, useState, useEffect } from 'react'
import { ConfigContextState, ConfigObject } from './types'

const contextDefaultValues: ConfigContextState = {
  configs: {
    loading: true,
    theme: 'light',
    markdownPreview: false,
    notesSortBy: 'lastUpdated',
    sidebarVisible: true,
    codeMirrorOptions: {
      textDirection: 'ltr',
      scrollPastEnd: false,
      highlightActiveLine: false,
      lineNumbers: true
    }
  },
  addConfig: () => { }
}

export const ConfigContext = createContext<ConfigContextState>(
  contextDefaultValues
)

type ProviderProps = { children: ReactElement }

const ConfigsProvider: FC<ProviderProps> = ({ children }) => {
  const [configs, setConfigs] = useState<ConfigObject>(contextDefaultValues.configs)

  useEffect(() => {
    const settings = localStorage.getItem('settings')

    settings !== null
      ? setConfigs(JSON.parse(settings))
      : localStorage.setItem('settings', JSON.stringify(configs))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addConfig = (prevConfig: ConfigObject, newConfig: ConfigObject) => {
    prevConfig[newConfig.key] = newConfig.value;

    setConfigs({ ...prevConfig });

    localStorage.setItem('settings', JSON.stringify(prevConfig));

    console.log(prevConfig, newConfig);
  }

  return (
    <ConfigContext.Provider value={{ configs, addConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}

export default ConfigsProvider
