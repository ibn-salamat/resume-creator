import { postRequest, API_SAVE_RESUME } from "./config";

export const saveResume = async (resume) => {
  console.log(resume);
  const url = API_SAVE_RESUME(resume.id);
  const data = await postRequest(url, resume);
};
