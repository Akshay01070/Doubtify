import answerModel from "../models/answerModel.js";
import uploadOnCloud from "../Utils/cloudinary.js";
import fs from 'fs';

const addAnswer = async (req, res) => {
  const { userId, questionId } = req.params;
  const { body } = req.body;
  const files = req.files;

  if (!userId || !questionId || !body) {
    return res.status(400).json({ success: false, message: "Incomplete data provided" });
  }

  let filesArray = [];
  if (files && files.length > 0) {
    await Promise.all(files.map(async (file) => {
      const localFilepath = file ? file.path : null;
      if (localFilepath) {
        try {
          const cloudinaryResponse = await uploadOnCloud(localFilepath);
          filesArray.push(cloudinaryResponse.url);
          fs.unlinkSync(localFilepath);
        } catch (error) {
          console.error('Error uploading to Cloudinary:', error);
        }
      }
    }));
  }

  try {
    const answer = new answerModel({
      userId: userId,
      questionId: questionId,
      body: body,
      files: filesArray
    });

    await answer.save();
    res.status(201).json({ success: true, message: "Answer added successfully", data: { answer } });
  } catch (error) {
    console.error("Error adding answer:", error);
    res.status(500).json({ success: false, message: "Failed to add answer" });
  }
};

const getAllAnswersByQuesId = async (req, res) => {
  const { quesId } = req.params;
  try {
    const answers = await answerModel.find({ questionId: quesId }).sort({ createdAt: -1 });
    res.json({ success: true, data: answers });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ success: false, message: "Error fetching answers" });
  }
};

// Get answer count for a question
const getAnswerCount = async (req, res) => {
  const { questionId } = req.params;
  try {
    const count = await answerModel.countDocuments({ questionId });
    res.json({ success: true, count });
  } catch (error) {
    console.error("Error counting answers:", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Get answers by user
const getAnswersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const answers = await answerModel.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: answers });
  } catch (error) {
    console.error("Error fetching user answers:", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { addAnswer, getAllAnswersByQuesId, getAnswerCount, getAnswersByUserId };