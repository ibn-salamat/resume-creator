const baseURL = "api";
export const API_SIGNUP = "api/auth/signup";
export const API_SIGNIN = "api/auth/signin";

export function postRequest(url, body) {
  return new Promise(async (resolve) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      const { message, error } = data;
      if (error) throw new Error(message);
      resolve(data);
    } catch (error) {
      console.error(error);
    }
  });
}
