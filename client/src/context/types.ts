export type ConfigContextState = {
  configs: any; //!
  addConfig: (prevConfig: any, config: ConfigObject) => void;
}

export type ResizerContextState = {
  appSideBarDrag: boolean;
  appSideBarWidth: number;
  noteSideBarDrag: boolean;
  noteSideBarWidth: number;
  handleAppSideBarDrag: (drag: boolean) => void;
  handleAppSideBarWidth: (width: number) => void;
  handleNoteSideBarDrag: (drag: boolean) => void;
  handleNoteSideBarWidth: (width: number) => void;
}

type ConfigObject = {
  key: string
  value: any
}
