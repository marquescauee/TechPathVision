import { useAttributesContext } from '../../../contexts/useAttributesContext'
import { Attribute } from '../../../interfaces/Attribute'
import './SelectedAttributes.css'

const SelectedAttributes = () => {
  const { selectedAttributes, setSelectedAttributes } = useAttributesContext()

  const removeAttributeFromSelected = (attribute: Attribute, id: string) => {
    setSelectedAttributes(
      (prevSelected) => prevSelected?.filter((attr) => attr.value !== attribute.value) || []
    )

    document.getElementsByClassName(`suggested-${id}`)[0]?.classList.remove('disabled')
  }

  return (
    <div className="selected-attributes-wrapper">
      <div className="suggested-attributes">
        {selectedAttributes?.map((attribute) => (
          <button
            key={attribute.value}
            className={`selected-attribute color-${attribute.classNumber}`}
            onClick={() => removeAttributeFromSelected(attribute, attribute.value)}>
            {attribute.label.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SelectedAttributes
