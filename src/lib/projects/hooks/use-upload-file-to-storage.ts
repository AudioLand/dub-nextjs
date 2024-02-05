// react
import { useCallback } from "react";
import toaster from "react-hot-toast";
import { useStorage } from "reactfire";

// firebase
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const useUploadFileToStorage = () => {
  const storage = useStorage();

  const uploadFile = async (file: File, userId: string, projectId: string, bucketName: string) => {
    const path = `${userId}/${projectId}/${file.name}`;
    const reference = ref(storage, `gs://${bucketName}/${path}`);
    const promise = uploadBytes(reference, file, {});

    await toaster.promise(promise, {
      success: `Your file was uploaded successfully!!`,
      loading: `Uploading..`,
      error: `Something went wrong..`,
    });

    return {
      publicUrl: await getDownloadURL(reference),
      filePathInBucket: path,
    };
  };

  return useCallback(uploadFile, [storage]);
};

export default useUploadFileToStorage;
