
export interface IFeedRoom {
    feedRoom: Number;
    owner: String;
    title:  String;
    content: String;
    image?: string;
    numberOfPlayers: Number;
    playerCharacters: Array<IPlayerCharacters>;
    numberOfComments: Number;
    numberOfLikes: Number;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }

  interface IPlayerCharacters {
    characterId : Number;
    characterName : String;
    player?: Number;
  };
