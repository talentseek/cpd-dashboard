import Image from 'next/image';

interface InteractiveCardProps {
title: string;
description: string;
imageSrc: string;
}

export default function InteractiveCard({ title, description, imageSrc }: InteractiveCardProps) {
return (
    <div className="bg-[#00334B]/80 backdrop-blur-md p-6 rounded-lg transform transition-all duration-300 hover:scale-105">
    <div className="relative w-full h-48 mb-4 overflow-hidden rounded">
        <Image 
            src={imageSrc} 
            alt={title} 
            className="object-cover" 
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
        />
    </div>
    <h3 className="text-2xl font-semibold mb-4 text-[#9ecc3b]">{title}</h3>
    <p className="text-white">{description}</p>
    </div>
);
}

