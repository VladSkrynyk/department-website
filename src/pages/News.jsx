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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
          {lang === "en" ? "Latest News" : "Останні новини"}
        </h1>

        {(!news || news.length === 0) ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-gray-600 text-center text-base sm:text-lg">
              {lang === "en" ? "No news yet." : "Новин поки немає."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {news.map((item) => {
              const img =
                (Array.isArray(item.photos) ? item.photos[0] : null) ||
                "/stuff/default-news.jpg";

              // 🌟 Беремо HTML із бекенду та перетворюємо в текст для картки
              const rawTitleHtml =
                lang === "en" ? item.short_description_en : item.short_description;
              const titleText = htmlToText(rawTitleHtml) || (lang === "en" ? "Untitled" : "Без заголовка");

              const dateStr = new Date(item.createdAt).toLocaleDateString(
                lang === "en" ? "en-US" : "uk-UA",
                { year: "numeric", month: "long", day: "numeric" }
              );

              return (
                <Link
                  to={`/${lang}/news/${item.id}`}
                  key={item.id}
                  className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={img}
                    alt={titleText}
                    className="w-full h-44 sm:h-48 md:h-56 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                      {titleText}
                    </h2>
                    <p className="text-gray-600 text-sm">{dateStr}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

};
export default News;
