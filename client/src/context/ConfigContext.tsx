import { createContext, FC, ReactElement, useState, useEffect } from 'react';
import { ConfigContextState } from './types';

const contextDefaultValues: ConfigContextState = {
  configs: {},
  addConfig: () => { }
};

type ConfigObject = {
  key: string,
  value: any
};

export const ConfigContext = createContext<ConfigContextState>(
  contextDefaultValues
);

type ProviderProps = {
  configJson: object,
  children: ReactElement
};

const ConfigsProvider: FC<ProviderProps> = (props) => {
  const [configs, setConfigs] = useState<object>(props.configJson);
  const settings = localStorage.getItem('settings');

  useEffect(() => {
    settings !== null
      ? setConfigs(JSON.parse(settings))
      : localStorage.setItem('settings', JSON.stringify(configs));
  }, [settings]);

  const addConfig = (prevConfig: any, newConfig: ConfigObject) => {
    prevConfig[newConfig.key] = newConfig.value;

    setConfigs(prevConfig);
    localStorage.setItem('settings', JSON.stringify(prevConfig));
  }

  return (
    <ConfigContext.Provider value={{ configs, addConfig }}>
      {props.children}
    </ConfigContext.Provider>
  );
}

export default ConfigsProvider;
