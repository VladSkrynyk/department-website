import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetNewsQuery } from "../redux/news/newsApiSlice";
import { Link } from "react-router-dom";

function htmlToText(html) {
  if (!html) return "";
  // Надійніше за regex: розпарсимо в DOM і візьмемо textContent
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent || el.innerText || "").trim();
}

const News = () => {
  const { data: newsData, isLoading, isError } = useGetNewsQuery();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const news = newsData?.ids?.map((id) => newsData.entities[id]) ?? [];

  if (isLoading) {
    return <div className="text-center py-10">{t("Завантаження новин...")}</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">{t("Не вдалося завантажити новини")}</div>;
  }

    return (
  <div className="min-h-screen bg-gray-50">
    {/* компенсуємо fixed header */}
    <div className="pt-24 md:pt-28 lg:pt-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
      {/* Заголовок */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {lang === "en" ? "Latest News" : "Останні новини"}
        </h1>
        <div className="mt-4 w-24 h-1 bg-blue-600 mx-auto rounded" />
      </div>

      {/* Порожній стан */}
      {(!news || news.length === 0) ? (
        <div className="flex items-center justify-center py-16 sm:py-20">
          <p className="text-gray-600 text-center text-base sm:text-lg">
            {lang === "en" ? "No news yet." : "Новин поки немає."}
          </p>
        </div>
      ) : (
        <>
          {/* Сітка новин */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {news.map((item) => {
              const img =
                (Array.isArray(item.photos) ? item.photos[0] : null) ||
                "/stuff/default-news.jpg";

              const rawTitleHtml =
                lang === "en" ? item.short_description_en : item.short_description;

              const titleText =
                htmlToText(rawTitleHtml) ||
                (lang === "en" ? "Untitled" : "Без заголовка");

              const dateStr = new Date(item.createdAt).toLocaleDateString(
                lang === "en" ? "en-US" : "uk-UA",
                { year: "numeric", month: "long", day: "numeric" }
              );

              return (
                <Link
                  to={`/${lang}/news/${item.id}`}
                  key={item.id}
                  className="block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100"
                >
                  <img
                    src={img}
                    alt={titleText}
                    className="w-full h-48 sm:h-56 object-cover"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                      {titleText}
                    </h2>
                    <p className="text-gray-500 text-sm">{dateStr}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Нижня лінія */}
          <div className="mt-10 sm:mt-12 border-t border-gray-200" />
        </>
      )}
    </div>
  </div>
);


};
export default News;
