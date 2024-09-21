import { useAttributesContext } from '../../../contexts/useAttributesContext'
import { Attribute } from '../../../interfaces/Attribute'
import './SuggestedAttributes.css'

const SuggestedAttributes = () => {
  const { suggestedAttributes, setSelectedAttributes, selectedAttributes } = useAttributesContext()

  const handleAddAttribute = (attribute: Attribute, id: string, classNumber: number) => {
    const alreadyAdded = selectedAttributes.find(
      (currentAttribute) => currentAttribute.value === attribute.value
    )

    if (alreadyAdded) return

    attribute.classNumber = classNumber
    setSelectedAttributes((prevSelected) => [...(prevSelected || []), attribute])
    document.getElementsByClassName(`suggested-${id}`)[0]?.classList.add('disabled')
  }

  return (
    <div className="suggested-attributes-wrapper">
      <div className="suggested-attributes-description">
        <div className="suggested-attributes-horizontal-line" />
        <div className="suggested-text">Caso esteja sem ideias, alguns exemplos:</div>
      </div>
      <div className="suggested-attributes">
        {suggestedAttributes?.map((attribute, index) => {
          const classNumber = (index % 3) + 1
          return (
            <button
              key={`${attribute.value}--${index}`}
              className={`suggested-attribute color-${classNumber} suggested-${attribute.value}`}
              onClick={() => handleAddAttribute(attribute, `${attribute.value}`, classNumber)}>
              {attribute.label.toUpperCase()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SuggestedAttributes
