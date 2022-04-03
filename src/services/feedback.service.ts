import { getRepository } from "typeorm";
import { Commerce, Feedback, User } from "../entities";
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
  const userRepository = getRepository(User);

  const commerce = await commerceRepository.findOne(commerceId, {
    relations: ["feedback"],
  });

  const newFeedback = feedbackRepository.create({
    rate,
    comment,
    feedbackOwnerId,
    commerce,
  });

  await feedbackRepository.save(newFeedback);

  if (commerce?.feedback) {
    await commerceRepository.save({
      ...commerce,
      feedback: [...commerce.feedback, newFeedback],
    });
  } else {
    await commerceRepository.save({ ...commerce, feedback: [newFeedback] });
  }

  const user = await userRepository.findOne(feedbackOwnerId);

  return {
    id: newFeedback.id,
    rate: newFeedback.rate,
    comment: newFeedback.comment,
    feedbackOnwer: {
      id: user?.id,
      firstName: user?.firstName,
      avatarUrl: user?.avatarUrl
    },
    commerce: {
      id: commerce?.id,
      cnpj: commerce?.cnpj,
      name: commerce?.name
    }
  };
};

export const deleteFeedback = async (id: string) => {
  const feedbackRepository = getRepository(Feedback);

  const feedback = await feedbackRepository.findOne(id);

  if (!feedback) {
    throw new AppError("Feedback not found!", 404);
  }

  await feedbackRepository.remove([feedback]);
};
