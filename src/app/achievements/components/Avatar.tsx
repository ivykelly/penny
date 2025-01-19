interface AvatarProps {
    src?: string;
    name: string;
    size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
};

export default function Avatar({ src, name, size = 'md' }: AvatarProps) {
    const initials = name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center`}>
            {src ? (
                <img
                    src={src}
                    alt={`${name}'s avatar`}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    {initials}
                </div>
            )}
        </div>
    );
} 