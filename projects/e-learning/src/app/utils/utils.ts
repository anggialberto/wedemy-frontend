import { File } from "@bootcamp-elearning/models/file";

const createElementTagA = (url: string): HTMLAnchorElement => {
  const link = document.createElement("a");
  link.href = url;
  return link;
}

const buildUrlBase64 = (data: File): string => {
  const url = `data:${data.type};base64,${data.file}`;
  return url;
}

export { createElementTagA, buildUrlBase64 };