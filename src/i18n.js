// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // Sử dụng backend để tải file dịch từ server hoặc thư mục
  .use(LanguageDetector) // Sử dụng language detector để tự động phát hiện ngôn ngữ người dùng
  .use(initReactI18next) // Khởi tạo react-i18next
  .init({
    fallbackLng: 'vi', // Ngôn ngữ mặc định
    debug: true, // Bật chế độ debug để xem thông tin chi tiết
    interpolation: {
      escapeValue: false, // Không cần escape các giá trị HTML
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Đường dẫn đến file dịch
    },
  });

export default i18n;