import { File } from "@bootcamp-elearning/models/file";

function downloadFile(data: File, fileName: string) {
  const source = `data:${data.type};base64,${data.file}`;
  const link = document.createElement("a");
  link.href = source;
  link.download = `${fileName}`
  link.click();
}

export { downloadFile }