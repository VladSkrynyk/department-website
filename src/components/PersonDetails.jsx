import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetPersonalitiesQuery,
  selectPersonalityById,
} from "../redux/personalities/personalitiesApiSlice";
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";

// icons
import {
  FiCornerDownLeft,
  FiUser,
  FiBookOpen,
  FiMonitor,
  FiMail,
  FiMapPin,
  FiLink2,
} from "react-icons/fi";

// Безпечно парсимо links
function parseLinks(linksRaw) {
  if (!linksRaw) return [];
  if (Array.isArray(linksRaw)) return linksRaw.filter(Boolean);
  try {
    const parsed = JSON.parse(linksRaw);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return typeof linksRaw === "string" ? [linksRaw] : [];
  }
}

// Дружня назва за доменом
function labelForDomain(url) {
  try {
    const u = new URL(url);
    const h = u.hostname.replace(/^www\./, "");

    if (h.includes("scholar.google")) return "Google Scholar";
    if (h.includes("researchgate")) return "ResearchGate";
    if (h.includes("orcid")) return "ORCID";
    if (h.includes("scopus")) return "Scopus";
    if (h.includes("webofscience") || h.includes("clarivate")) return "Web of Science";
    if (h.includes("linkedin")) return "LinkedIn";
    if (h.includes("github")) return "GitHub";
    if (h.includes("academia")) return "Academia";
    if (h.includes("semanticscholar")) return "Semantic Scholar";
    return h;
  } catch {
    return url;
  }
}

function PersonDetails() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // підтягуємо кеш
  const { isLoading } = useGetPersonalitiesQuery();
  const person = useSelector((state) => selectPersonalityById(state, id));

  const links = useMemo(() => parseLinks(person?.links), [person]);

  if (isLoading) {
    return <div className="text-center text-blue-500 mt-10">Завантаження...</div>;
  }

  if (!person) {
    return <div className="text-center text-red-500 mt-10">Людину не знайдено.</div>;
  }

  // Локалізовані поля
  const fullname = lang === "uk" ? person.fullname : person.fullname_en;
  const degree = lang === "uk" ? person.scy_degree : person.scy_degree_en;
  const rank = lang === "uk" ? person.scy_rank : person.scy_rank_en;
  const position = lang === "uk" ? person.scy_position : person.scy_position_en;

  const generalHtml = lang === "uk" ? person.general_info : person.general_info_en;
  const scienceHtml = lang === "uk" ? person.scientific_activity : person.scientific_activity_en;
  const teachingHtml = lang === "uk" ? person.teaching_work : person.teaching_work_en;

  // Хелпер для безпечного HTML
  const renderHtml = (html) => (
    <div
      className="prose prose-blue max-w-none text-gray-800"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html || "") }}
    />
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Верхня панель з кнопкою "назад" */}
        <div className="p-4 sm:p-5 border-b">
          <Link
            to={`/${lang}/personalities`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <FiCornerDownLeft className="text-lg" />
            {lang === "uk" ? "До списку персоналій" : "Back to Personalities"}
          </Link>
        </div>

        {/* Контент */}
        <div className="p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Фото */}
          <div className="flex-shrink-0 flex justify-center">
            <img
              src={person.photo}
              alt={fullname}
              className="w-40 h-40 lg:w-56 lg:h-56 rounded-full object-cover shadow-md ring-2 ring-gray-100"
            />
          </div>

          {/* Текстова частина */}
          <div className="flex-1 max-w-3xl text-gray-800">
            {/* Ім’я та атрибути */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{fullname}</h1>
            <div className="space-y-1 mb-6">
              {degree && <p className="text-lg text-gray-700">{degree}</p>}
              {rank && <p className="text-gray-700">{rank}</p>}
              {position && <p className="text-gray-700">{position}</p>}
            </div>

            {/* Секції (HTML-версія) */}
            {generalHtml && (
              <section className="mb-8">
                <header className="flex items-center gap-2 mb-3">
                  <FiUser className="text-blue-600" />
                  <h2 className="text-xl font-semibold">
                    {lang === "uk" ? "Загальна інформація" : "General information"}
                  </h2>
                </header>
                {renderHtml(generalHtml)}
              </section>
            )}

            {scienceHtml && (
              <section className="mb-8">
                <header className="flex items-center gap-2 mb-3">
                  <FiBookOpen className="text-blue-600" />
                  <h2 className="text-xl font-semibold">
                    {lang === "uk" ? "Наукова діяльність" : "Scientific activity"}
                  </h2>
                </header>
                {renderHtml(scienceHtml)}
              </section>
            )}

            {teachingHtml && (
              <section className="mb-8">
                <header className="flex items-center gap-2 mb-3">
                  <FiMonitor className="text-blue-600" />
                  <h2 className="text-xl font-semibold">
                    {lang === "uk" ? "Викладацька робота" : "Teaching"}
                  </h2>
                </header>
                {renderHtml(teachingHtml)}
              </section>
            )}

            {/* Контакти */}
            {(person.contact_email || person.contact_place || person.cv) && (
              <section className="mb-8">
                <header className="flex items-center gap-2 mb-3">
                  <FiMail className="text-blue-600" />
                  <h2 className="text-xl font-semibold">
                    {lang === "uk" ? "Контакти" : "Contacts"}
                  </h2>
                </header>
                <div className="space-y-1 text-gray-700">
                  {person.contact_email && (
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      <a
                        href={`mailto:${person.contact_email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {person.contact_email}
                      </a>
                    </p>
                  )}
                  {person.contact_place && (
                    <p className="flex items-start gap-1">
                      <FiMapPin className="mt-1 shrink-0 text-blue-600" />
                      <span>{person.contact_place}</span>
                    </p>
                  )}
                  {person.cv && (
                    <p>
                      <a
                        href={person.cv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        CV
                      </a>
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Науковометричні посилання */}
            {links.length > 0 && (
              <section className="mb-2">
                <header className="flex items-center gap-2 mb-3">
                  <FiLink2 className="text-blue-600" />
                  <h2 className="text-xl font-semibold">
                    {lang === "uk" ? "Посилання" : "Links"}
                  </h2>
                </header>
                <ul className="list-disc list-inside space-y-1">
                  {links.map((url, i) => (
                    <li key={`${url}-${i}`}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {labelForDomain(url)}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetails;
