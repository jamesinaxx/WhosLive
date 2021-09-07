import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 50px;
`;

const FailedHeader = styled.header`
  font-size: 7vw;
  color: rgb(199, 33, 33);
`;

const Description = styled.p`
  font-size: 3vw;
  a {
    transition: color 100ms ease-in-out;
    color: #05d1d1;
    text-decoration: none;
    &:hover {
      color: #048585;
    }
  }
`;

export default function Error404() {
  return (
    <Container>
      <FailedHeader>Failed to connect to Twitch</FailedHeader>
      <Description>
        Please try to troubleshoot your connection and if everything seems okay,
        try going to{' '}
        <a href="https://twitch.tv" target="_blank" rel="noreferrer">
          Twitch
        </a>
        .
        <br />
        <br />
        If Twitch loads fine, then there is a bug with Now Live. Please report
        this{' '}
        <a href="https://github.com/jamesinaxx/NowLive/issues">
          here{' '}
          <FontAwesomeIcon
            icon={faGithub}
            style={{
              color:
                document.body.style.backgroundColor === 'rgb(255, 255, 255)'
                  ? '#000'
                  : '#fff',
            }}
          />
        </a>
      </Description>
    </Container>
  );
}
