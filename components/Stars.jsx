import { Star } from "lucide-react";

export default function Stars({ rating = 5, size = 11 }) {
  const rounded = Math.round(rating);
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={size}
          strokeWidth={1.6}
          fill={value <= rounded ? "currentColor" : "none"}
          opacity={value <= rounded ? 1 : 0.4}
        />
      ))}
    </span>
  );
}
