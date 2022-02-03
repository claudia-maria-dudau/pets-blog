import { useCollection } from '../../hooks/useCollection'

// components
import AlertIsPending from '../../components/AlertIsPending'
import AlertError from '../../components/AlertError'
import ArticleCard from '../../components/article-card/ArticleCard'

// styles
import './Articles.css'

export default function Articles() {
  const { documents: articles, isPending, error } = useCollection('articles')

  return (
    <>
      {isPending && <AlertIsPending />}

      {articles && (
        <div className="grid">
          {articles.map(article => (
            <ArticleCard article={article} key={article.id}/>
          ))}
        </div>
      )}

      {error && <AlertError message={error} />}
    </>
  );
}
