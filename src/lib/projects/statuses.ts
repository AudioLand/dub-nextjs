enum PROJECT_STATUSES {
  uploading = "uploading",
  uploaded = "uploaded",
  uploadingError = "uploadingError",
  translating = "translating",
  translated = "translated",
  translationError = "translationError",
}

export const ERROR_PROJECT_STATUSES = [
  PROJECT_STATUSES.translationError,
  PROJECT_STATUSES.uploadingError,
];

export type TicketErrorType = PROJECT_STATUSES.translationError | PROJECT_STATUSES.uploadingError;

export default PROJECT_STATUSES;

export const PROJECT_STATUSES_TEXTS: { [k in PROJECT_STATUSES]: string } = {
  [PROJECT_STATUSES.uploading]: "File uploading 🔄",
  [PROJECT_STATUSES.uploaded]: "File In ✔️",
  [PROJECT_STATUSES.translating]: "Processing 🔄",
  [PROJECT_STATUSES.translated]: "Translation Complete ✅",
  [PROJECT_STATUSES.uploadingError]: "Error (Lost in Uploading 🤷‍♂️)",
  [PROJECT_STATUSES.translationError]: "Error (Lost in Translation 🤷‍♂️)",
};
