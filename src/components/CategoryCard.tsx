import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  image: string;
  category: string;
}

const CategoryCard = ({ title, image, category }: CategoryCardProps) => {
  return (
    <Link to={`/search?category=${category}`}>
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
        <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-[hsl(var(--accent))] transition-colors">
          {title}
        </h3>
        <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-white">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <span className="text-sm text-[hsl(var(--prime-blue))] font-medium group-hover:underline inline-flex items-center gap-1">
          Shop now
          <svg 
            className="w-4 h-4 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
