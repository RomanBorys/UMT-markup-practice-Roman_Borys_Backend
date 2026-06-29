import { Feedback } from "../models/Feedback.js";

export async function findAllFeedbacks() {
  return Feedback.findAll({
    order: [["id", "ASC"]],
  });
}

export async function createFeedback(payload) {
  return Feedback.create({
    author: payload.author,
    text: payload.text,
  });
}