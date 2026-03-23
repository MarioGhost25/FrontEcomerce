const DEFAULT_ENDPOINT = "/api/image/transform";
const DEFAULT_TRANSFORM = {
  maxWidth: 1200,
  quality: 80,
  format: "webp",
};

export const fileToDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // data:image/...;base64,...
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const transformSingleImage = async (
  image,
  { endpoint = DEFAULT_ENDPOINT, transform = DEFAULT_TRANSFORM } = {}
) => {
  // URL remota: no transformar
  if (typeof image === "string" && !image.startsWith("data:image/")) {
    return image;
  }

  const imageDataUrl =
    image instanceof File || image instanceof Blob
      ? await fileToDataURL(image)
      : image;

  if (typeof imageDataUrl !== "string" || !imageDataUrl.startsWith("data:image/")) {
    throw new Error("Invalid image format");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageDataUrl,
      transform,
    }),
  });

  if (!response.ok) {
    throw new Error("Image transform failed");
  }

  const data = await response.json();

  if (!data?.outputDataUrl) {
    throw new Error("Invalid transform response");
  }

  return data.outputDataUrl;
};

export const transformImages = async (images = [], options = {}) => {
  if (!Array.isArray(images) || images.length === 0) return [];
  return Promise.all(images.map((img) => transformSingleImage(img, options)));
};