import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetNewsQuery } from "../redux/news/newsApiSlice";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { uk, enUS } from "date-fns/locale";
import DOMPurify from "dompurify";

import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";


// Допоміжне: HTML -> plain text для заголовка
function htmlToText(html) {
  if (!html) return "";
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent || el.innerText || "").trim();
}

function NewsDetails() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const { data: newsRaw, isLoading, isError } = useGetNewsQuery();

  const newsItem = useMemo(() => newsRaw?.entities?.[id], [newsRaw, id]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <p className="text-center mt-10 text-gray-600">Завантаження...</p>;
  }
  if (isError || !newsItem) {
    return <p className="text-center mt-10 text-red-500">Новину не знайдено.</p>;
  }

  const dateLocale = currentLang === "uk" ? uk : enUS;
  const created = format(new Date(newsItem.createdAt), "dd MMM yyyy, HH:mm", { locale: dateLocale });
  const updated = format(new Date(newsItem.updatedAt), "dd MMM yyyy, HH:mm", { locale: dateLocale });

  // Вміст (HTML із редактора)
  const titleHtml = currentLang === "uk" ? newsItem.short_description : newsItem.short_description_en;
  const titleText = htmlToText(titleHtml) || (currentLang === "uk" ? "Без заголовка" : "Untitled");

  const contentHtml =
    currentLang === "uk" ? newsItem.longer_description : newsItem.longer_description_en;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Навігація */}
        <Link
          to={`/${currentLang}/news`}
          className="inline-block mb-4 sm:mb-6 text-blue-600 hover:text-blue-800 transition font-medium"
        >
          ← {currentLang === "uk" ? "До новин" : "Back to News"}
        </Link>

        {/* Контент */}
        <article className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {/* Заголовок + дати */}
          <header>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {titleText}
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              {currentLang === "uk" ? "Створено:" : "Created:"} {created} &nbsp;|&nbsp;
              {currentLang === "uk" ? "Оновлено:" : "Updated:"} {updated}
            </p>
          </header>

          {/* Основний текст із форматуванням (санітизований) */}
          <section
            className="prose prose-blue prose-sm sm:prose lg:prose-lg max-w-none text-gray-800"
            // Tailwind Typography працює з готовим HTML
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contentHtml || "") }}
          />

          {/* Галерея фото */}
          {/* {Array.isArray(newsItem.photos) && newsItem.photos.length > 0 && (
            <section className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {newsItem.photos.map((url, idx) => (
                  <figure key={idx} className="w-full">
                    <img
                      src={url}
                      alt={`Фото новини ${idx + 1}`}
                      className="w-full aspect-[4/3] object-cover rounded-md shadow-sm"
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
            </section>
          )} */}

          {Array.isArray(newsItem.photos) && newsItem.photos.length > 0 && (
            <section className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {newsItem.photos.map((url, idx) => (
                  <figure key={idx} className="w-full">
                    <img
                      src={url}
                      alt={`Фото новини ${idx + 1}`}
                      className="w-full aspect-[4/3] object-cover rounded-md shadow-sm cursor-pointer hover:opacity-90 transition"
                      loading="lazy"
                      onClick={() => {
                        setPhotoIndex(idx);
                        setIsOpen(true);
                      }}
                    />
                  </figure>
                ))}
              </div>
            </section>
          )}

          {isOpen && (
            <Lightbox
              mainSrc={newsItem.photos[photoIndex]}
              nextSrc={newsItem.photos[(photoIndex + 1) % newsItem.photos.length]}
              prevSrc={newsItem.photos[(photoIndex + newsItem.photos.length - 1) % newsItem.photos.length]}
              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() =>
                setPhotoIndex((photoIndex + newsItem.photos.length - 1) % newsItem.photos.length)
              }
              onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % newsItem.photos.length)
              }
            />
          )}

        </article>
      </div>
    </div>
  );
}

export default NewsDetails;
