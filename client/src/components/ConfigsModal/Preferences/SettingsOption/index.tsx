import { SettingsInfo } from '..'
import './style.scss'

const SettingsOption = ({
  type,
  heading,
  description,
  checked,
  options,
  selectedOption,
  onClick,
  onChange
}: SettingsInfo) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!onChange) return

    e.preventDefault()
    onChange(e.currentTarget.value)
  }

  return (
    <div className='settings-option'>
      <div>
        <h4>{heading}</h4>
        <p className='description'>{description}</p>
      </div>

      {type === 'Checkbox'
        ? (
          <label className='switch'>
            <input type="checkbox" defaultChecked={checked} />
            <span className='slider' onClick={onClick} />
          </label>
        ) : (
          <select onChange={handleSelectChange} value={selectedOption}>
            {options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.description}
              </option>
            ))}
          </select>
        )
      }
    </div>
  )
}

export default SettingsOption