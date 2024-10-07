import { useEffect, useState } from 'react'
import './ViewRoadmap.css'
import { useAuth } from '../../contexts/useAuth'
import { useCareersContext } from '../../contexts/useCareersContext'
import { useNavigate } from 'react-router-dom'
import { Roadmap } from '../../interfaces/Roadmap'
import Spinner from '../spinner/Spinner'
import MarkdownContent from '../markdown/Markdown'
import { roadmapMock } from '../../mock/roadmapMock'

interface ContentProps {
  title: string | undefined
  content: string | undefined
}

const ViewRoadmap = () => {
  const { getCredentials } = useAuth()
  const navigate = useNavigate()
  const { saveRoadmap, mappedRoadmap, generateSubjectContent } = useCareersContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [sucessMessage, setSuccessMessage] = useState<string>('')
  const [previousContent, setPreviousContent] = useState<ContentProps | undefined>(undefined)
  const [currentContent, setCurrentContent] = useState<ContentProps>()
  const [currentMappedRoadmap, setCurrentMappedRoadmap] = useState<Roadmap>({
    subjects: [],
    title: ''
  })

  const handleSaveRoadmap = async () => {
    setErrorMessage('')
    setSuccessMessage('')
    const token = getCredentials().token

    if (!token) {
      localStorage.setItem('roadmapToBeSaved', JSON.stringify(currentMappedRoadmap))
      navigate('/login')
      return
    }

    const response = await saveRoadmap(token, currentMappedRoadmap)

    if (response.error) {
      setErrorMessage('Falha ao salvar roadmap')

      setTimeout(() => {
        setErrorMessage('')
      }, 2000)

      return
    }

    setSuccessMessage('Roadmap salvo com sucesso!')

    setTimeout(() => {
      setSuccessMessage('')
    }, 2000)
  }

  const handleGenerateContent = async (e: React.MouseEvent, content: string) => {
    e.preventDefault()
    e.stopPropagation()

    setPreviousContent(currentContent)

    setLoading(true)
    setCurrentContent({ title: content, content: undefined })

    const response = await generateSubjectContent(content)

    setCurrentContent({ title: content, content: response })
    setLoading(false)
  }

  useEffect(() => {
    const roadmap = localStorage.getItem('roadmap')

    if (roadmap) {
      setCurrentMappedRoadmap(JSON.parse(roadmap))
      return
    }

    setCurrentMappedRoadmap(roadmapMock)
  }, [mappedRoadmap])

  return (
    <div className="roadmap-container">
      <div className="view-roadmap-title">{currentMappedRoadmap.title}</div>
      <div className="subjects-container">
        {currentMappedRoadmap.subjects.map((subject, index) => {
          const modalId = `roadmap-${subject.title.replace(/\s+/g, '-')}`

          return (
            <div
              key={subject.title}
              className="roadmap-box roadmap-expand"
              role="button"
              data-toggle="modal"
              onClick={() => setCurrentContent(previousContent)}
              data-target={`#${modalId}`}>
              <p className="modal-subject-title">{subject.title}</p>
              {index < currentMappedRoadmap.subjects.length - 1 && (
                <div className="roadmap-arrow-container">
                  <div className="roadmap-arrow" />
                  <div className="arrow-stem" />
                </div>
              )}
              <div
                className="modal fade pr-0"
                id={modalId}
                tabIndex={-1}
                role="dialog"
                aria-labelledby="roadmap"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div
                    className="modal-content"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}>
                    <div className="modal-header">
                      <h5 className="modal-title">
                        {currentContent ? currentContent.title : subject.title}
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
                      {currentContent?.title ? (
                        <>
                          {loading ? (
                            <Spinner />
                          ) : (
                            <p className="modal-body-content">
                              <MarkdownContent content={currentContent.content} />
                            </p>
                          )}
                          <button
                            type="button"
                            className="back-button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()

                              setCurrentContent(previousContent)
                            }}>
                            VOLTAR
                          </button>
                        </>
                      ) : (
                        <>
                          {subject.description && (
                            <p className="modal-body-content">{subject.description}</p>
                          )}
                          <div className="horizontal-line roadmap-horizontal-line"></div>
                          {subject.content && (
                            <>
                              <div className="content-title">Alguns conteúdos para estudos:</div>
                              {subject.content.map((content) => (
                                <a
                                  href="#"
                                  key={content}
                                  className="modal-body-content modal-body-content-link"
                                  onClick={(e) => handleGenerateContent(e, content)}>
                                  {content}
                                </a>
                              ))}
                            </>
                          )}
                          <div className="horizontal-line roadmap-horizontal-line"></div>
                          {subject.documentation && (
                            <>
                              <div className="content-title">Possíveis fontes de pesquisa:</div>
                              {subject.documentation.map((documentation) => (
                                <div
                                  key={documentation.title}
                                  className="modal-body-content link-wrapper">
                                  <p className="documentation-title">{documentation.title}</p>
                                  <a
                                    href={documentation.url}
                                    target="_blank"
                                    className="documentation-url"
                                    onClick={(e) => e.stopPropagation()}
                                    rel="noreferrer">
                                    {documentation.url}
                                  </a>
                                </div>
                              ))}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <button type="button" className="generate-roadmap" onClick={handleSaveRoadmap}>
        SALVAR ROADMAP
      </button>
      {(errorMessage || sucessMessage) && (
        <div className="toast" style={{ background: sucessMessage ? '#98E8BF' : '#F16767' }}>
          {sucessMessage ? sucessMessage : errorMessage}
        </div>
      )}
    </div>
  )
}

export default ViewRoadmap
