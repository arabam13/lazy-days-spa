import { getTreatments } from '../db-func/index.js';
import { Request, Response } from 'express';

export async function get(req: Request, res: Response): Promise<Response> {
  try {
    const treatments = await getTreatments();
    return res.status(200).json(treatments);
  } catch (e) {
    return res.status(500).json({ message: `could not get treatments: ${e}` });
  }
}

export default {
  get,
};
