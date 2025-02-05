import type { Chr } from "../../types/Provider/ProviderType";

export default function PhotosProvider({
  chr,
  photosToDisplay,
}: { chr: Chr; photosToDisplay: string[] }) {
  return (
    <div className="imageGroup">
      {chr &&
        chr.images.length > 0 &&
        photosToDisplay.map((image, index) => (
          <img
            key={`${chr.name} ${index}`}
            src={`${import.meta.env.VITE_IMAGE_URL}/${image}`}
            alt={chr.name}
          />
        ))}
    </div>
  );
}
