import { useState, createContext, FC, ReactElement } from 'react'
import { ResizerContextState } from './types'

const contextDefaultValues: ResizerContextState = {
  appSideBarDrag: false,
  appSideBarWidth: 240,
  noteSideBarDrag: false,
  noteSideBarWidth: 330,
  handleAppSideBarDrag: () => { },
  handleAppSideBarWidth: () => { },
  handleNoteSideBarDrag: () => { },
  handleNoteSideBarWidth: () => { }
}


export const ResizerContext = createContext<ResizerContextState>(
  contextDefaultValues
)

type ProviderProps = { children: ReactElement }

const ResizerProvider: FC<ProviderProps> = (props) => {
  const [appSideBarDrag, setAppSideBarDrag] = useState<boolean>(false)
  const [noteSideBarDrag, setNoteSideBarDrag] = useState<boolean>(false)
  const [appSideBarWidth, setAppSideBarWidth] = useState<number>(contextDefaultValues.appSideBarWidth)
  const [noteSideBarWidth, seNoteSideBarWidth] = useState<number>(contextDefaultValues.noteSideBarWidth)

  const handleAppSideBarDrag = (drag: boolean) => {
    setAppSideBarDrag(() => drag)
  }

  const handleNoteSideBarDrag = (drag: boolean) => {
    setNoteSideBarDrag(() => drag)
  }

  const handleAppSideBarWidth = (width: number) => {
    setAppSideBarWidth(() => width)
  }

  const handleNoteSideBarWidth = (width: number) => {
    seNoteSideBarWidth(() => width)
  }

  return (
    <ResizerContext.Provider
      value={{
        appSideBarDrag,
        appSideBarWidth,
        noteSideBarDrag,
        noteSideBarWidth,
        handleAppSideBarDrag,
        handleAppSideBarWidth,
        handleNoteSideBarDrag,
        handleNoteSideBarWidth
      }}>
      {props.children}
    </ResizerContext.Provider>
  )
}

export default ResizerProvider
