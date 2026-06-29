import {
  createFeedback,
  findAllFeedbacks,
} from "../services/feedbacksService.js";

export async function getFeedbacks(_req, res) {
  const feedbacks = await findAllFeedbacks();

  res.status(200).json(feedbacks);
}

export async function addFeedback(req, res) {
  const feedback = await createFeedback(
    req.body,
  );

  res.status(201).json(feedback);
}