import { getRepository } from "typeorm";
import { Commerce, Feedback } from "../entities";
import AppError from "../errors/AppError";

interface IBody {
  rate: number;
  comment: string;
  feedbackOwnerId: string;
  commerceId: string;
}

export const createFeedback = async (body: IBody) => {
  const { rate, comment, feedbackOwnerId, commerceId } = body;

  const feedbackRepository = getRepository(Feedback);
  const commerceRepository = getRepository(Commerce);

  const commerce = await commerceRepository.findOne(commerceId);

  const newFeedback = feedbackRepository.create({
    rate,
    comment,
    feedbackOwnerId,
    commerce,
  });

  await feedbackRepository.save(newFeedback);

  return newFeedback;
};


export const deleteFeedback = async (id: string) => {
  const feedbackRepository = getRepository(Feedback);

  const feedback = await feedbackRepository.findOne(id);

  if (!feedback) {
    throw new AppError("Category not found!", 404);
  }

  await feedbackRepository.remove([feedback]);
};
