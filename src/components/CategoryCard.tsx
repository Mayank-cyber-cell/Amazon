import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  image: string;
  category: string;
}

const CategoryCard = ({ title, image, category }: CategoryCardProps) => {
  return (
    <Link to={`/search?category=${category}`}>
      <div className="bg-card border border-border rounded p-6 hover:shadow-lg transition-all duration-200 group">
        <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-[hsl(var(--accent))] transition-colors">
          {title}
        </h3>
        <div className="aspect-square rounded overflow-hidden mb-4 bg-white">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <span className="text-sm text-[hsl(var(--prime-blue))] hover:underline">
          Shop now
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
