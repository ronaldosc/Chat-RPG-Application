import { api } from '@api';
import { Button } from '@components/common/button';
import {
  BodyText,
  Color,
  H2,
  SelectInput,
  TextArea,
  TextInput,
} from '@components/common';
import { Container } from '@components/container';
import { Header } from '@components/header';
import { encodeURL, customEnqueueSnackbar } from '@helpers';
import { useSnackbar } from 'notistack';
import { X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateGameStyle } from './style';

interface characterProps {
  characterId: number;
  characterName: string;
  player: string | null;
}

interface CreateGameProps {
  _id: string;
  owner: string;
  title: string;
  numberOfPlayers: number;
  playerCharacters: characterProps[];
  image: string | null;
  content: string;
}

export const CreateGame = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [gameProperties, setGameProperties] = useState<CreateGameProps>({
    _id: '',
    title: '',
    numberOfPlayers: 0,
    playerCharacters: [],
    image: null,
    content: '',
    owner: '',
  });
  const [idFeedRoom, setIdFeedRoom] = useState<string>('');

  async function createGame() {
    navigate(encodeURL(['feed']));
    gameProperties.playerCharacters = gameProperties.playerCharacters.filter(
      (character) => character.characterId <= gameProperties.numberOfPlayers,
    );
    try {
      const { data } = await api.post('/feed-room/new-feed', gameProperties);
      console.log(data);
      await api.post(`/chat-room/new-chatroom/${data.data.newFeed._id}`);
      customEnqueueSnackbar('Jogo criado com sucesso!', 'success');
      navigate(encodeURL(['feed']));
    } catch (error) {
      customEnqueueSnackbar('Erro ao criar jogo!', 'error');
    }
  }

  function handlePlayersAmount() {
    const inputs: JSX.Element[] = [];
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
            <TextInput
              onBlur={(e) => {
                if (gameProperties.playerCharacters[i]) {
                  gameProperties.playerCharacters[i].characterName =
                    e.target.value;
                } else {
                  setGameProperties({
                    ...gameProperties,
                    playerCharacters: [
                      ...gameProperties.playerCharacters,
                      {
                        characterId: i + 1,
                        characterName: e.target.value,
                        player: null,
                      },
                    ],
                  });
                }
              }}
            />
          </Container>
        </>,
      );
    }
    return inputs;
  }

  useEffect(() => {}, []);

  return (
    <>
      <Header></Header>
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
            <H2>Edite as configurações do jogo</H2>
            <X
              size={22}
              color={Color.Black.base}
              onClick={() => navigate(-1)}
              onMouseEnter={(e) => {
                e.currentTarget.style.cursor = 'pointer';
              }}
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
                maxLength={24}
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
              <BodyText>Número de Jogadores</BodyText>
              <SelectInput
                options={['1', '2', '3', '4', '5', '6', '7', '8']}
                onChange={(e) => {
                  setGameProperties({
                    ...gameProperties,
                    numberOfPlayers: +e.target.value,
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
                <BodyText>Enredo</BodyText>
                <TextArea
                  placeholder="Escreva aqui aquela sua narrativa e/ou a descrição de um contexto para iniciar o jogo. Regras somente se necessário inicialmente. Seja criativo!"
                  onChange={(e: any) =>
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
