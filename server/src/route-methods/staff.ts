import { getStaff } from '../db-func/index.js';
import { Request, Response } from 'express';

export async function get(req: Request, res: Response): Promise<Response> {
  try {
    const staff = await getStaff();
    return res.status(200).json(staff);
  } catch (e) {
    return res.status(500).json({ message: `could not get staff: ${e}` });
  }
}

export default {
  get,
};
