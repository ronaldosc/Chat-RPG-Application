import { Button } from '../../components/Button';
import { Color } from '../..//components/common/constants';
import { Header } from '../../components/Header';
import { House, X } from '@phosphor-icons/react';
import { Container } from '../../components/Container';
import { FeedStyle } from '../Feed/style';
import { BodyText, H2 } from '../../components/common/typography';
import { useEffect, useState } from 'react';
import { api, apiJSON } from '../../libs/api';
import { useNavigate } from 'react-router';
import { encodeURL } from '../../helpers/URLNavigationReplace';

interface characterProps {
  characterId: number;
  characterName: string;
  player: string | null;
}

interface CreateGameProps {
  title: string;
  numberOfPlayers: number;
  playerCharacters: characterProps[];
  content: string;
}

export const CreateGame = () => {
  const navigate = useNavigate();
  const [gameProperties, setGameProperties] = useState<CreateGameProps>({
    title: '',
    numberOfPlayers: 0,
    playerCharacters: [],
    content: '',
  });

  async function createGame() {
    try {
      const { data } = await api.post('/feed-room/new-feed', {
        title: '',
        numberOfPlayers: 0,
        playerCharacters: [{ characterId: 0, characterName: '', player: ''}],
        content: '',
      });
      navigate(encodeURL(['feed']));
    } catch (error) {
      console.log(error);
      
    }
  }

  function handlePlayersAmount() {
    let inputs: JSX.Element[] = [];
    for (let i = 0; i < gameProperties.numberOfPlayers; i++) {
      inputs.push(
        <>
          <Container
            direction="column"
            justify="center"
            align="start"
            width="200px"
            height="50px"
            overflow="none"
          >
            <BodyText>Jogador {i + 1}</BodyText>
            <input type="text" name="" id="" />
          </Container>
        </>,
      );
    }
    return inputs;
  }

  useEffect(() => {}, []);

  return (
    <>
      <Header>
        <Button
          color={Color.Gold}
          icon={<House size={22} color={Color.White.base} />}
        />
      </Header>
      <FeedStyle>
        <Container
          backgroundColor={Color.Background.base}
          justify="start"
          padding="10px 16px"
          height="90%"
        >
          <Container
            backgroundColor="transparent"
            justify="space-between"
            align="center"
            direction="row"
            height="50px"
            overflow="hidden"
          >
            <H2>Criar jogo</H2>
            <X
              size={22}
              color={Color.Black.base}
              onClick={() => navigate(-1)}
              onMouseEnter={(e) => (e.currentTarget.style.cursor = 'pointer')}
            />
          </Container>
          <Container
            justify="start"
            align="start"
            padding="12px"
            gap="12px"
            overflow="auto"
          >
            <Container justify="center" align="start" overflow="none">
              <BodyText>Título</BodyText>
              <input
                type="text"
                name="title"
                onChange={(e) =>
                  setGameProperties({
                    ...gameProperties,
                    title: e.target.value,
                  })
                }
              />
            </Container>

            <Container
              direction="row"
              justify="start"
              align="center"
              gap="8px"
              overflow="none"
            >
              <BodyText>Número de jogadores</BodyText>
              <select
                name=""
                id=""
                value={gameProperties.numberOfPlayers}
                onChange={(e) => {
                  setGameProperties({
                    ...gameProperties,
                    numberOfPlayers: Number(e.target.value),
                  });
                  handlePlayersAmount();
                }}
                color={Color.Black.base}
              >
                <option value="0">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </Container>

            <Container
              flexWrap="wrap"
              direction="row"
              justify="start"
              align="center"
              overflow="none"
            >
              {handlePlayersAmount()}
            </Container>
            <Container
              direction="column"
              justify="center"
              align="start"
              backgroundColor="transparent"
              overflow="none"
            >
              <BodyText>História</BodyText>
              <input
                type="text"
                name=""
                id=""
                onChange={(e) =>
                  setGameProperties({
                    ...gameProperties,
                    content: e.target.value,
                  })
                }
              />
            </Container>
          </Container>
          <Container height="40px" direction="row" gap="16px">
            <Button
              label="Cancelar"
              color={Color.Red}
              onClick={() => navigate(-1)}
            />
            <Button
              label="Criar"
              color={Color.Green}
              onClick={() => createGame()}
            />
          </Container>
        </Container>
      </FeedStyle>
    </>
  );
};