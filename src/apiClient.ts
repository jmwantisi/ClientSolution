import axios from 'axios';

const REACT_APP_API_URL= "https://restful-booker.herokuapp.com"

const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

const DEFAULT_HEADERS: any = {
  'Content-Type': 'application/json'
}

interface Data {
  url: string,
  payload: any | {},
  headers: any
}

export const post: any = async (data: Data): Promise<any> => {

  try {

    const headers: any = data.headers;

    const response = await api.post(data.url, data.payload, {
      headers: { ...DEFAULT_HEADERS, ...headers }
    });

    return SuccessResponseBody(response);

  } catch (error: any) {

    return ErrorResponseBody(error);

  }
};


export const get: any = async (url: string, headers: any, id: any = ''): Promise<any> => {

  try {

    const response = await api.get(`${url}/${id}`, {
      headers: { ...DEFAULT_HEADERS, ...headers }
    });

    return SuccessResponseBody(response);

  } catch (error: any) {

    return ErrorResponseBody(error);

  }
};

export const put = async (url: string, id: any, data: any): Promise<any> => {

  try {

    const response = await api.put(`/${url}/${id}`, data);

    return SuccessResponseBody(response);

  } catch (error: any) {

    return ErrorResponseBody(error);

  }
};

export const remove = async (url: string, id: number): Promise<any> => {

  try {

    const response = await api.delete(`/${url}/${id}`);

    return SuccessResponseBody(response);

  } catch (error: any) {

    return ErrorResponseBody(error);

  }
};

function SuccessResponseBody(content: any): any {

  const { status, data, statusText }: any = content;

  return {
    status,
    statusText,
    data
  }
}

function ErrorResponseBody(content: any): any {

  const { message, code, response }: any = content;

  return {
    message,
    code,
    response
  }
}