import { useCareersContext } from '../../contexts/useCareersContext'

const ViewSavedRoadmap = () => {
  const { showSavedRoadmap } = useCareersContext()

  const mappedRoadmap = showSavedRoadmap

  return (
    <div className="roadmap-container">
      <div className="view-roadmap-title">{mappedRoadmap.title}</div>
      <div className="subjects-container">
        {mappedRoadmap.subjects.map((subject, index) => {
          const modalId = `roadmap-${subject.title.replace(/\s+/g, '-')}`

          return (
            <a
              key={subject.title}
              className="roadmap-box roadmap-expand"
              type="button"
              data-toggle="modal"
              data-target={`#${modalId}`}
              href="#">
              {subject.title}
              {index < mappedRoadmap.subjects.length - 1 && (
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
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        {subject.title}
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
                      {subject.description && (
                        <p className="modal-body-content">{subject.description}</p>
                      )}
                      <div className="horizontal-line roadmap-horizontal-line"></div>
                      {subject.content && (
                        <>
                          <div className="content-title">Alguns conteúdos para estudos:</div>
                          {subject.content.map((content) => (
                            <p key={content} className="modal-body-content">
                              {content}
                            </p>
                          ))}
                        </>
                      )}
                      <div className="horizontal-line roadmap-horizontal-line"></div>
                      {subject.documentation && (
                        <>
                          <div className="content-title">Possíveis fontes de pesquisa:</div>
                          {subject.documentation.map((documentation) => (
                            <div key={documentation.title} className="modal-body-content">
                              <p className="documentation-title">{documentation.title}</p>
                              <p className="documentation-url">{documentation.url}</p>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default ViewSavedRoadmap
