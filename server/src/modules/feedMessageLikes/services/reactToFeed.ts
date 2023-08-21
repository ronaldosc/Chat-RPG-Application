/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FeedMessageLikes } from '../model';
import { connectToMongoDB } from '../../../config/mongodb';
import { FeedMessageLikesModel } from '../interface';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { FeedMessages } from '../../feedMessages/model';

export async function reactToFeed(param: FeedMessageLikesModel) {
  try {
    await connectToMongoDB();

    const likeStatus = await FeedMessageLikes.findOne({ feedMessage: param.feedMessage, author: param.author });

    if (!likeStatus) {
      const newLike = new FeedMessageLikes();

      newLike.feedMessage = param.feedMessage;
      newLike.author = param.author;

      await newLike.save();

      const feedLike = await FeedMessages.updateOne(
        { _id: param.feedMessage },
        { $inc: { numberOfLikes: 1 } },
      );

      const hasFailed: bool = feedLike.modifiedCount !== 1;
      if (hasFailed) {
        throw new ErrorWithStatus('Like não foi inserido', 500);
      }

      return {
        message: 'Like realizado com sucesso!',
        data: {
          newLike,
        },
      };
    }

   const removeLike = await FeedMessageLikes.findOneAndDelete({ feedMessage: param.feedMessage, author: param.author });

    const feedDislike = await FeedMessages.updateOne(
      { _id: param.feedMessage },
      { $inc: { numberOfLikes: -1 } },
    );

    const hasFailed: bool = feedDislike.modifiedCount !== 1;
    if (hasFailed) {
      throw new ErrorWithStatus('Dislike não foi realizado', 500);
    }

    return {
      message: 'Dislike realizado com sucesso!',
      data: {
        removeLike,
      },
    };
  } catch (error) {
    let errorStatus: number | null;
    let errorMessage: string | null;
    if (error instanceof ErrorWithStatus) {
      errorStatus = error.getStatus();
      errorMessage = error.message;
    }
    return {
      error: errorStatus ?? 500,
      message: errorMessage ?? 'Erro ao realizar dislike',
    };
  }
}
