import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import IsLoading from './IsLoading';
import { FaEnvelope } from "react-icons/fa";

export default function SharedLayout({ language }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header currentLanguage={language} />

      {/* flex-grow розтягує контент і притискає футер до самого низу екрана */}
      <Suspense fallback={<IsLoading />}>
        <main className="flex-grow pt-20 md:pt-24">
          <Outlet />
        </main>
      </Suspense>

      <footer className="bg-blue-900 text-white py-6 px-4 md:px-8 lg:px-16 mt-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
          {/* Корисні посилання */}
          <div>
            <h2 className="text-base md:text-lg font-semibold mb-2">{t('usefulLinks')}</h2>
            <ul className="space-y-1 text-sm md:text-base">
              <li>
                <a href="https://department.univ.ua" className="hover:text-teal-300" target="_blank" rel="noreferrer">
                  {t('deptNameFull')}
                </a>
              </li>
              <li>
                <a href="https://mechmat.knu.ua" className="hover:text-teal-300" target="_blank" rel="noreferrer">
                  {t('mechmatFull')}
                </a>
              </li>
              <li>
                <a href="https://www.univ.kiev.ua" className="hover:text-teal-300" target="_blank" rel="noreferrer">
                  {t('kievUniFull')}
                </a>
              </li>
            </ul>
          </div>

          {/* Контакти */}
          <div>
            <h2 className="text-base md:text-lg font-semibold mb-2">{t('footerContacts')}</h2>
            <p className="flex justify-center md:justify-start items-center gap-2 text-sm md:text-base">
              <FaEnvelope />
              <a href="mailto:knu.diffeq@gmail.com" className="hover:text-teal-300">
                knu.diffeq@gmail.com
              </a>
            </p>
          </div>
        </div>

        <hr className="border-teal-500 my-6" />

        <p className="text-center text-xs md:text-sm lg:text-base">
          © {new Date().getFullYear()} {t('deptNameFull')}. {t('footerRights')}
        </p>
      </footer>
    </div>
  );
}