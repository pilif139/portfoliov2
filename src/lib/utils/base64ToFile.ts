export default function base64ToFile(base64String: string, fileName: string) : File{
    // Extract the MIME type from the base64 string
    const mimeType = base64String.match(/data:([^;]+);base64,/)![1];
    const extension = mimeType.split('/')[1];

    if (!fileName.endsWith(`.${extension}`)) {
        fileName += `.${extension}`;
    }
    
    // Decode the base64 string
    const byteString = atob(base64String.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // Convert the decoded data into a Blob
    const blob = new Blob([ab], { type: mimeType });

    // Create a File object from the Blob
    return new File([blob], fileName, { type: mimeType });
}

export function base64ToBlob(base64String: string, fileName: string){
    // Extract the MIME type from the base64 string
    const mimeType = base64String.match(/data:([^;]+);base64,/)![1];
    const extension = mimeType.split('/')[1];

    if (!fileName.endsWith(`.${extension}`)) {
        fileName += `.${extension}`;
    }
    
    // Decode the base64 string
    const byteString = atob(base64String.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // Convert the decoded data into a Blob
    const blob = new Blob([ab], { type: mimeType });

    // Create a File object from the Blob
    return new Blob([blob], { type: mimeType });
}

