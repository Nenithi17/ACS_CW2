import { useState } from 'react';

/**
 * Props for Gallery component
 */
interface GalleryProps {
  images: string[];
  alt: string;
}

/**
 * Gallery component
 * Displays a large image with thumbnail navigation
 * Clicking a thumbnail changes the main image
 */
export const Gallery = ({ images, alt }: GalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  /**
   * Handle thumbnail click
   */
  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  if (images.length === 0) {
    return <div className="gallery-empty">No images available</div>;
  }

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img
          src={images[selectedIndex]}
          alt={`${alt} - Image ${selectedIndex + 1}`}
          className="gallery-main-image"
        />
      </div>
      <div className="gallery-thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            className={`gallery-thumbnail ${index === selectedIndex ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`View image ${index + 1}`}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

