import { useContext } from 'react';
import SettingsOption from './SettingsOption'
import './style.scss'
import { ConfigContext } from '../../../context';
import { ConfigContextState, ConfigObject } from '../../../context/types';


export type SettingsInfo = {
  type: 'Checkbox' | 'Options';
  heading: string;
  description: string;
  checked?: boolean;
  options?: { description: string, value: string }[];
  selectedOption?: string;
  onClick?: () => void;
  onChange?: (value: string) => void;
}

const Preferences = () => {
  const { configs, addConfig } = useContext(ConfigContext) as ConfigContextState;
  const { codeMirrorOptions, notesSortBy, markdownPreview, theme, }: ConfigObject = configs;

  const settingsInfo: SettingsInfo[] = [
    {
      type: 'Checkbox',
      heading: 'Active line highlight',
      description: 'Controls whether the editor should highlight the active line',
      checked: codeMirrorOptions.highlightActiveLine,
      onClick: () => addConfig(configs, {
        'key': 'codeMirrorOptions',
        'value': {
          ...codeMirrorOptions,
          highlightActiveLine: !codeMirrorOptions.highlightActiveLine
        }
      })
    },
    {
      type: 'Checkbox',
      heading: 'Display line numbers',
      description: 'Controls whether the editor should display line numbers',
      checked: codeMirrorOptions.lineNumbers,
      onClick: () => addConfig(configs, {
        'key': 'codeMirrorOptions',
        'value': {
          ...codeMirrorOptions,
          lineNumbers: !codeMirrorOptions.lineNumbers
        }
      })
    },
    {
      type: 'Checkbox',
      heading: 'Scroll past end',
      description: 'Controls whether the editor will add blank space to the end of all files',
      checked: codeMirrorOptions.scrollPastEnd,
      onClick: () => addConfig(configs, {
        'key': 'codeMirrorOptions',
        'value': {
          ...codeMirrorOptions,
          scrollPastEnd: !codeMirrorOptions.scrollPastEnd
        }
      })
    },
    {
      type: 'Checkbox',
      heading: 'Markdown preview',
      description: 'Controls whether markdown preview mode is enabled',
      checked: markdownPreview,
      onClick: () => addConfig(configs, {
        'key': 'markdownPreview',
        'value': !markdownPreview
      })
    },
    {
      type: 'Checkbox',
      heading: 'Dark mode',
      description: 'Controls the theme of the application and editor',
      checked: theme === 'light' ? false : true,
      onClick: () => addConfig(configs, {
        'key': 'theme',
        'value': theme === 'light' ? 'dark' : 'light',
      })
    },
    {
      type: 'Options',
      heading: 'Sort By',
      description: 'Controls the sort strategy of the notes',
      options: [
        { description: 'Title', value: 'title' },
        { description: 'Date Created', value: 'dateCreated' },
        { description: 'Last Updated', value: 'lastUpdated' },
      ],
      selectedOption: notesSortBy,
      onChange: (value: string) => addConfig(configs, {
        'key': 'notesSortBy',
        'value': value
      })
    },
    {
      type: 'Options',
      heading: 'Text direction',
      description: 'Controls the direction of the text',
      options: [
        { description: 'Left to right', value: 'ltr' },
        { description: 'Right to left', value: 'rtl' }
      ],
      selectedOption: codeMirrorOptions.textDirection,
      onChange: (value: string) => addConfig(configs, {
        'key': 'codeMirrorOptions',
        'value': {
          ...codeMirrorOptions,
          textDirection: value
        }
      })
    },
  ]

  return (
    <>
      <h3>Preferences</h3>

      {settingsInfo.map((
        { type, heading, description, checked, options, selectedOption, onClick, onChange }
      ) => (
        <SettingsOption
          key={heading}
          type={type}
          heading={heading}
          description={description}
          checked={checked}
          options={options}
          selectedOption={selectedOption}
          onClick={onClick}
          onChange={onChange}
        />
      ))}
    </>
  )
}

export default Preferences