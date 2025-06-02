import { useTranslation } from "react-i18next";

const NoTransactionsText = () => {
  const { t } = useTranslation('common');
  return (
    <p className="text-center text-gray-600 mt-10">
      {t('noTransactions')} <br />
      {t('startNow')}
    </p>
  );
};

export default NoTransactionsText;