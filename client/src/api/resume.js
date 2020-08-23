import {
  postRequest,
  API_SAVE_RESUME,
  API_GET_RESUMES,
  getRequest,
  API_GET_RESUME_BY_ID,
} from "./config";
import { GET_RESUME_BY_ID, GET_RESUMES_LIST } from "../store/loader";

export const saveResume = async (resume) => {
  const url = API_SAVE_RESUME(resume.id);
  const data = await postRequest(url, resume);

  return data;
};

export const getResumes = async (length) => {
  const url = API_GET_RESUMES(length);
  const data = await getRequest(url, GET_RESUMES_LIST);

  return data;
};

export const getResumeById = async (id) => {
  const url = API_GET_RESUME_BY_ID(id);
  const data = await getRequest(url, GET_RESUME_BY_ID);

  return data;
};
