import './LoadingPage.css'

interface LoadingPageProps {
  component: string
}

const LoadingPage = ({ component }: LoadingPageProps) => {
  return (
    <div className="loading-page-container">
      {component === 'map-profile' && (
        <div className="loading-page-title">
          Estamos mapeando carreiras compatíveis com os seus atributos e interesses!
        </div>
      )}
      {component === 'generate-roadmap' && (
        <div className="loading-page-title">
          Estamos gerando o roadmap para a carreira selecionada!
        </div>
      )}
      <div className="loading-page-title">Isso pode levar alguns minutos...</div>
      <div className="boxes">
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
