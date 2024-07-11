import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';

import './styles.scss';
import { useParam } from '../../hooks/useParam';
import i18n from "i18next";
import cn from "classnames";

type Language = {
  key: string;
  label: string;
};

const languages: Language[] = [
  { key: 'ru', label: 'RU' },
  { key: 'en', label: 'EN' },
  // Добавьте другие языки по необходимости
];

const LanguageSelector: React.FC<{className?: string}> = ({className = ''}) => {
  const { param: currentLang, updateQueryParam } = useParam('language', 'ru'); // Использование useParam
  const [isClient, setIsClient] = useState(false); // Состояние для проверки, находимся ли мы на клиенте
  const [selectedLang, setSelectedLang] = useState<string>('RU');

  useEffect(() => {
    i18n.changeLanguage(currentLang || 'ru');
    const newLang =
      languages.find((lang) => lang.key === currentLang)?.label || 'RU';
    setSelectedLang(newLang);
  }, [currentLang]);

  useEffect(() => {
    setIsClient(true); // Подтверждаем, что компонент смонтирован на клиенте
  }, []);

  const handleMenuClick = (e: MenuInfo) => {
    const newLangKey = e.key.toString();
    updateQueryParam(newLangKey); // Обновляем язык в URL
    const newLangLabel =
      languages.find((lang) => lang.key === newLangKey)?.label || 'RU';
    setSelectedLang(newLangLabel);
  };

  if (!isClient) return null; // Не рендерим ничего, пока не подтвердим, что находимся на клиенте

  const menu = (
    <Menu onClick={handleMenuClick}>
      {languages.map((lang) => (
        <Menu.Item key={lang.key}>{lang.label}</Menu.Item>
      ))}
    </Menu>
  );

  const buttonStyle = {
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
  };

  return (
    <Dropdown overlay={menu} className={cn("language-selector", className)} >
      <Button style={buttonStyle}>
        {selectedLang} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default LanguageSelector;
