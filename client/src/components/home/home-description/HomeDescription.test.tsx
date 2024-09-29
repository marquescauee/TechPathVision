import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomeDescription from './HomeDescription'

describe('HomeDescription Component', () => {
  it('should render the home description text', () => {
    render(<HomeDescription />)

    const descriptionText =
      /Procurando por uma carreira de tecnologia\? Encontre seu caminho e veja o que está por vir\. Mapeie suas habilidades, interesses e características pessoais para descobrir quais áreas da tecnologia mais combinam com seu perfil\. Com base nessas informações, nosso sistema oferece recomendações personalizadas e um roadmap de estudos detalhado, ajudando você a se aprofundar nas áreas que mais lhe interessam\. Seja você um iniciante buscando uma nova direção ou alguém querendo mudar de área, temos as ferramentas para guiá-lo de forma eficaz em sua jornada profissional, proporcionando um plano claro e adaptado às suas necessidades e objetivos\./i

    expect(screen.getByText(descriptionText)).toBeInTheDocument()
  })
})
