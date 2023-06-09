export type ConfigObject = {
  [key: string]: any
}

export type ConfigContextState = {
  configs: ConfigObject;
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
