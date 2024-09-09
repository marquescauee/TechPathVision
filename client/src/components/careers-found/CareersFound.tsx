import { useNavigate } from 'react-router-dom'
import './CareersFound.css'
const CareersFound = () => {
  const navigate = useNavigate()

  const handleGenerateRoadmap = () => {
    navigate('/generated-roadmap')
  }

  return (
    <>
      <div className="careers-found-header-wrapper">
        <div className="careers-found-header">CARREIRAS ENCONTRADAS PARA VOCÊ!</div>
        <div className="careers-found-horizontal-line"></div>
      </div>
      <div className="careers-found-wrapper">
        <div className="career-found">
          <div className="careers-found-title">TITULO AREA</div>
          <div className="careers-found-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum dolores vel non. Sed
            harum id dignissimos recusandae architecto similique sunt veniam, nemo asperiores beatae
            fuga delectus eum obcaecati a nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Velit deleniti officiis, unde ea corporis saepe omnis ullam quibusdam, eligendi
            nisi error veniam eos dignissimos est, odio optio earum minus consequuntur.
            <a
              type="button"
              data-toggle="modal"
              data-target="#careersModal"
              className="careers-found-read-more"
              href="#">
              Descubra Mais
            </a>
          </div>
          <div
            className="modal fade pr-0"
            id="careersModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="careersModal"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    SEGURANÇA DA INFORMAÇÃO
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body pt-5">
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <button
                    data-dismiss="modal"
                    type="button"
                    className="generate-roadmap"
                    onClick={handleGenerateRoadmap}>
                    GERAR ROADMAP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="career-found">
          <div className="careers-found-title">TITULO AREA</div>
          <div className="careers-found-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum dolores vel non. Sed
            harum id dignissimos recusandae architecto similique sunt veniam, nemo asperiores beatae
            fuga delectus eum obcaecati a nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Velit deleniti officiis, unde ea corporis saepe omnis ullam quibusdam, eligendi
            nisi error veniam eos dignissimos est, odio optio earum minus consequuntur.
            <a
              type="button"
              data-toggle="modal"
              data-target="#careersModal2"
              className="careers-found-read-more"
              href="#">
              Descubra Mais
            </a>
          </div>
          <div
            className="modal fade"
            id="careersModal2"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="careersModal2"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    DESENVOLVIMENTO WEB
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body pt-5">
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <button
                    data-dismiss="modal"
                    type="button"
                    className="generate-roadmap"
                    onClick={handleGenerateRoadmap}>
                    GERAR ROADMAP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="career-found">
          <div className="careers-found-title">TITULO AREA</div>
          <div className="careers-found-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum dolores vel non. Sed
            harum id dignissimos recusandae architecto similique sunt veniam, nemo asperiores beatae
            fuga delectus eum obcaecati a nihil. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Velit deleniti officiis, unde ea corporis saepe omnis ullam quibusdam, eligendi
            nisi error veniam eos dignissimos est, odio optio earum minus consequuntur.
            <a
              type="button"
              data-toggle="modal"
              data-target="#careersModal3"
              className="careers-found-read-more"
              href="#">
              Descubra Mais
            </a>
          </div>
          <div
            className="modal fade"
            id="careersModal3"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="careersModal3"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    UX DESIGN
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body pt-5">
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <p className="modal-body-paragraphs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam ex
                    nesciunt rerum repellat nulla, voluptates dolor debitis dolore ipsum beatae,
                    nostrum ducimus, error a officiis labore! Cupiditate, ad consequuntur!
                  </p>
                  <button
                    data-dismiss="modal"
                    type="button"
                    className="generate-roadmap"
                    onClick={handleGenerateRoadmap}>
                    GERAR ROADMAP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CareersFound
