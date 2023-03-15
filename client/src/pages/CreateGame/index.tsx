import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/Button';
import { Color } from '../..//components/common/constants';
import { Header } from '../../components/Header';
import { House, X } from '@phosphor-icons/react';
import { Container } from '../../components/Container';
import { FeedStyle } from '../Feed/style';
import { BodyText, H2 } from '../../components/common/typography';

import { api, apiJSON } from '../../libs/api';

import { encodeURL } from '../../helpers/URLNavigationReplace';
import { SelectInput, TextInput } from '../../components/common/inputs';
import { TextArea } from '../../components/common/inputs/inputs-components.styled';
import { CreateGameStyle } from './style';
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();

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
        playerCharacters: [{ characterId: 0, characterName: '', player: '' }],
        content: '',
      });
      enqueueSnackbar('Jogo criado com sucesso!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
      navigate(encodeURL(['feed']));
    } catch (error) {
      enqueueSnackbar('Erro ao criar jogo!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
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
          >
            <BodyText>Jogador {i + 1}</BodyText>
            <TextInput />
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
        
      </Header>
      <CreateGameStyle>
        <Container
          backgroundColor={Color.Background.base}
          justify="start"
          padding="10px 16px"
        >
          <Container
            backgroundColor="transparent"
            justify="space-between"
            align="center"
            direction="row"
            height="50px"
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
            <Container justify="center" align="start">
              <BodyText>Título</BodyText>
              <TextInput
                type="text"
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
              height="200px"
            >
              <BodyText>Número de jogadores</BodyText>
              <SelectInput
                options={['-', '1', '2', '3', '4', '5', '6', '7', '8']}
                onChange={(e) => {
                  setGameProperties({
                    ...gameProperties,
                    numberOfPlayers: Number(e.target.value),
                  });
                  handlePlayersAmount();
                }}
              />
            </Container>

            <Container
              flexWrap="wrap"
              direction="row"
              justify="start"
              align="center"
            >
              <>{handlePlayersAmount()}</>

              <Container
                direction="column"
                justify="center"
                align="start"
                backgroundColor="transparent"
              >
                <BodyText>História</BodyText>
                <TextArea
                  onChange={(e) =>
                    setGameProperties({
                      ...gameProperties,
                      content: e.target.value,
                    })
                  }
                />
              </Container>
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
      </CreateGameStyle>
    </>
  );
};
