import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useLanguage } from "@/hooks/useLanguage";

export default function Error404Page() {
  return (
    <div className="p-6">
      <PageBreadcrumb pageTitle="Common.navigation.error404" />
      
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
          Страница не найдена
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Извините, запрашиваемая страница не существует.
        </p>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Вернуться на главную
        </button>
      </div>
    </div>
  );
} 