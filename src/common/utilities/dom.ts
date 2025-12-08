export const download = (blob: Blob | MediaSource, fileName: string) => {
  // 1. Create a temporary anchor element
  const a = document.createElement('a');

  // 2. Create a temporary URL for the Blob data
  const url = URL.createObjectURL(blob);

  // 3. Set the anchor attributes
  a.href = url;
  a.download = fileName;
  
  // This is crucial: the download attribute forces the file download prompt
  
  // 4. Simulate a click to initiate the download
  document.body.appendChild(a); // Must be attached to the DOM for Firefox/some browsers
  a.click();
  
  // 5. Clean up: revoke the temporary URL and remove the element
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
