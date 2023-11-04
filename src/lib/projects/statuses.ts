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

export default PROJECT_STATUSES;
