import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/logo512.png";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Desenvolvedor Power BI e Web" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Bem vindo ao meu Portifólio</span>
                <h1>{`Olá! Eu sou Fernando`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Analista de BI" ]'><span className="wrap">{text}</span></span></h1>
                  <p>Graduado em Administração de Empresas pela Universidade Estadual de Goiás. 2 anos de experiência com desenvolvimento de relatórios gerenciais, dashboards interativos e geração de insights que agreguem valor ao negócio a fim de otimizar processos, auditar informações, identificar oportunidades e assim gerar valor para a organização. Experiência em projetos de Power BI e UI&UX. Possuo conhecimento em processos ETL, Linguagem DAX, Visualização de Dados, Excel avançado, Protheus, SQL Oracle, Python, React e RPA. Tenho forte capacidade analítica e sou detalhista, proativo, comprometido com pessoas e resultados.</p>
                  <button onClick={() => console.log('connect')}>Vamos lá <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={8} md={4} xl={3}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
