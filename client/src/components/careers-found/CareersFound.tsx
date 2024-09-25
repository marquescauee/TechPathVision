import { useNavigate } from 'react-router-dom'
import './CareersFound.css'
import { useEffect, useState } from 'react'
import { Career } from '../../interfaces/Career'
import { useCareersContext } from '../../contexts/useCareersContext'
import { areas } from '../../mock/areas'
import LoadingPage from '../loading-page/LoadingPage'

const CareersFound = () => {
  const navigate = useNavigate()
  const [careers, setCareers] = useState<Career[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { mappedCareers, generateRoadmap } = useCareersContext()

  const handleGenerateRoadmap = async (career: Career) => {
    setErrorMessage('')
    setLoading(true)

    const response = await generateRoadmap(career.title)

    if (response.error) {
      setErrorMessage('Falha ao enviar atributos.')
      return
    }

    setLoading(false)
    navigate('/generated-roadmap')
  }

  useEffect(() => {
    setCareers(areas)
  }, [])

  if (loading) return <LoadingPage />

  return (
    <>
      <div className="careers-found-header-wrapper">
        <div className="careers-found-header">CARREIRAS ENCONTRADAS PARA VOCÊ!</div>
        {errorMessage && <div>{errorMessage}</div>}
        <div className="careers-found-horizontal-line"></div>
      </div>
      <div className="careers-found-wrapper">
        {careers.map((career) => {
          const modalId = `careersModal-${career.title.replace(/\s+/g, '-')}`

          return (
            <div className="career-found" key={career.title}>
              <div className="careers-found-title">{career.title}</div>
              <div className="careers-found-description">
                {career.shortDescription}
                <a
                  type="button"
                  data-toggle="modal"
                  data-target={`#${modalId}`}
                  className="careers-found-read-more"
                  href="#">
                  Descubra Mais
                </a>
              </div>
              <div
                className="modal fade pr-0"
                id={modalId}
                tabIndex={-1}
                role="dialog"
                aria-labelledby="careersModal"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        {career.title}
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body pt-5">
                      {career.longDescription1 && (
                        <p className="modal-body-paragraphs">{career.longDescription1}</p>
                      )}
                      {career.longDescription2 && (
                        <p className="modal-body-paragraphs">{career.longDescription2}</p>
                      )}
                      {career.longDescription3 && (
                        <p className="modal-body-paragraphs">{career.longDescription3}</p>
                      )}
                      {career.longDescription4 && (
                        <p className="modal-body-paragraphs">{career.longDescription4}</p>
                      )}
                      {career.longDescription5 && (
                        <p className="modal-body-paragraphs">{career.longDescription5}</p>
                      )}
                      <p className="modal-body-paragraphs modal-skills-title">
                        Habilidades Envolvidas:
                      </p>
                      {career.skills &&
                        career.skills.map((skill) => (
                          <p
                            key={`${career.title}-${skill}`}
                            className="modal-body-paragraphs modal-body-skills">
                            {skill}
                          </p>
                        ))}
                      <button
                        data-dismiss="modal"
                        type="button"
                        className="generate-roadmap"
                        onClick={() => handleGenerateRoadmap(career)}>
                        GERAR ROADMAP
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default CareersFound
