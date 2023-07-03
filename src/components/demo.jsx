import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick, trash } from '../assets';
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {

  const [Article, setArticle] = useState({
    url: '',
    summary: '',
  });

  const [allArticles, setAllArticles] = useState([]);
  const [Copy, setCopy] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )

    if(articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({
      articleUrl: Article.url
    });

    if(data?.summary) {
      const newArticle = { ...Article, summary: data.summary };

      const updatedAllArticles = [newArticle, ...allArticles];
      setAllArticles(updatedAllArticles);

      setArticle(newArticle);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  }

  const handleCopy = (copyUrl) => {
    setCopy(copyUrl);
    navigator.clipboard.writeText((copyUrl));
    setTimeout(() => { setCopy(false) }, 3000)
  }

  const handleErease = (article) => {
    const articlesFromLS = JSON.parse(localStorage.getItem('articles'));

    if (articlesFromLS) {
      const updatedArticles = articlesFromLS.filter(
        (item) => item.url !== article.url
      );

      localStorage.setItem('articles', JSON.stringify(updatedArticles));

      setAllArticles(updatedArticles);
    }

  }

  return (
    <section className="w-full max-w-xl mt-16">
      { /* Search */ }
      <div className="flex flex-col w-full gap-2">
        <form className="relative flex items-center justify-center" onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link_icon" className="absolute left-0 w-5 my-2 ml-3" draggable="false"/>
          <input type="url" placeholder="Escribe una URL..." value={Article.url} onChange={(e) => setArticle({ ...Article, url: e.target.value })} required className="url_input peer" />
          <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            ➤
          </button>
        </form>

        {/* URL History */}
        <div className="flex flex-col gap-1 overflow-y-auto max-h-60">
          {allArticles.map((item, index) => (
            <div key={`link-${index}`} onClick={() => setArticle(item)} className="link_card">
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img src={Copy === item.url ? tick : copy} alt="copy_icon" className="w-[40%] h-[40%] object-contain" />
              </div>
              <p className="flex-1 text-sm font-medium text-blue-700 truncate font-satoshi">
                {item.url}
              </p>
              <div className="w-10" onClick={() => handleErease(item.url)}>
                <img src={trash} alt="trash_icon" className="w-[40%] h-[40%] object-contain hover:text-red-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Result Display */}
      <div className="flex items-center justify-center max-w-full my-10">
        {isFetching ? (
          <>
            <img src={loader} alt="loader" className="object-contain w-20 h-20" />
            <br />
            <br />
            <span className="text-lg text-center text-gray-700">El Articulo está siendo <span className="grad_one">Resumido</span>...</span>
          </>
        ) : error ? (
          <p className="font-bold text-center text-black font-inter">
            Bueno, eso no deberia haber pasado...
            <br />
            <span className="font-normal text-gray-700 font-satoshi">
              {error ?.data?.error}
            </span>
          </p>
        ) : (
          Article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-gray-600 font-satoshi">
                Articulo <span className="blue_gradient">Resumido</span>
              </h2>
              <div className="summary_box">
                <p className="text-sm font-medium text-gray-700 font-inter">
                  {Article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo