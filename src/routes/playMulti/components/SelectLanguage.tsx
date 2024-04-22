import React, { useEffect } from 'react';
import styles from './SelectLanguage.module.scss';

interface SelectLangBtnProps {
  options: string[];
  selectedOption: string | null;
  setSelectedOption: (option: string) => void;
  toggle: () => void;
  isOpen: boolean;
}

const SelectLanguageBtn: React.FC<SelectLangBtnProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  toggle,
  isOpen,
}) => {
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option); // 선택된 옵션 업데이트
  };

  useEffect(() => {
    console.log("Selected Option:", selectedOption);
  }, [selectedOption]);

  return (
    <div className={styles.btn_container}>
      <button onClick={toggle} className={styles.toggle_button}>
        <span className={styles.toggle_emoji}>⌵ &nbsp;</span>
        <span>{selectedOption ? selectedOption : 'language'}</span>
      </button>
      {isOpen && (
        <div className={styles.options_container}>
          {options.map((option, index) => (
            <div className={styles.option} key={index} onClick={() => handleOptionSelect(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectLanguageBtn;
