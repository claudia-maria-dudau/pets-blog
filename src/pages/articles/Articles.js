import { useCollection } from '../../hooks/useCollection';

// components
import ArticleCard from '../../components/ArticleCard';

export default function Articles() {
  const { documents: articles } = useCollection('articles')

  return (
      <>
        {articles && articles.map(article => (
          <ArticleCard article={article} />
        ))}
      </>
  );
}
