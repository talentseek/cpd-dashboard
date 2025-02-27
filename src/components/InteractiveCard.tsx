import Image from "next/image"
import styles from "@/components/styles/InteractiveCard.module.css"

interface InteractiveCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

export default function InteractiveCard({ title, description, imageSrc }: InteractiveCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image 
          src={imageSrc} 
          alt={title} 
          className={styles.image}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}