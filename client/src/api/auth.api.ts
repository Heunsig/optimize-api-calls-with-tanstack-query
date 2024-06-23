import { UnauthorizedError } from "@/errors/UnauthorizedError";

export async function signIn(payload: {
  email: string;
  password: string;
}): Promise<any> {
  const response = await fetch(`/api/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (json.status === "error") {
    throw new (json.message);
  }

  return json.data;
}

export async function signUp(payload: {
  email: string;
  password: string;
}): Promise<any> {
  const response = await fetch(`/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (json.status === "error") {
    throw new (json.message);
  }

  return json.data;
}


export async function me() {
  const response = await fetch(`/api/me`);
  const json = await response.json();
  const status = response.status;

  if (json.status === "error") {
    if (status === 401) {
      throw new UnauthorizedError(json.message);
    }

    throw new (json.message);
  }

  return json.data;
}