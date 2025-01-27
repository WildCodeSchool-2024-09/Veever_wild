import type { RequestHandler } from "express";
import type { ClientKeyword } from "../../types/keyword/keywordTypes";
import KeywordsClientRepository from "./KeywordsClientRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    const clientKeywords = await KeywordsClientRepository.readAll();
    res.json(clientKeywords);
  } catch (error) {
    next(error);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    const clientKeywordId = Number(req.params.id);
    const clientKeyword = await KeywordsClientRepository.read(clientKeywordId);

    if (!clientKeyword) {
      res.sendStatus(404);
    } else {
      res.json(clientKeyword);
    }
  } catch (error) {
    next(error);
  }
};

// The E of BREAD - Edit operation
const edit: RequestHandler = async (req, res, next) => {
  const clientKeywordId = Number(req.params.id);

  try {
    const clientKeywordData: ClientKeyword = {
      client_id: req.body.client_id,
      keyword_id: req.body.keyword_id,
      id: clientKeywordId,
    };

    const updatedClientKeyword =
      await KeywordsClientRepository.update(clientKeywordData);

    if (!updatedClientKeyword) {
      res.sendStatus(404);
    } else {
      res.json(updatedClientKeyword);
    }
  } catch (error) {
    next(error);
  }
};

// The A of BREAD - Add operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const clientKeywordData: Omit<ClientKeyword, "id"> = {
      client_id: req.body.client_id,
      keyword_id: req.body.keyword_id,
    };

    const insertId = await KeywordsClientRepository.create(clientKeywordData);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

// The D of BREAD - Delete operation
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const clientKeywordId = Number(req.params.id);
    const affectedRows =
      await KeywordsClientRepository.destroy(clientKeywordId);

    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.sendStatus(clientKeywordId);
    }
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };
