import attachmentAPI from "../api/attachment-api";
import { useEffect, useState } from "react";

export function useCreateAttachment() {
  const createAttachmentHandler = (expenseId, attachmentData) =>
    attachmentAPI.create(expenseId, attachmentData.url, attachmentData.name);

  return createAttachmentHandler;
}

export function useGetAttachments(expenseId) {
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    (async () => {
      const attachments = await attachmentAPI.getAll(expenseId);
      setAttachments(attachments);
    })();
  }, [expenseId]);

  return [attachments, setAttachments];
}
