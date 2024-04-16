import React, { useEffect, useState } from 'react';
import styles from './CodeEditor.module.scss';
import SelectLanguageBtn from './SelectLanguage';
import { Editor } from '@monaco-editor/react';
import Button from '../../../components/common/Button';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// 언어 변경에 따른 basecode 변경을 위한 language 타입 정의
interface LanguageState {
  isOpen: boolean;
  options: string[];
  selectedOption: string | null;
}

// 코드 에디터가 받는 Props 타입 정의
interface CodeEditorProps {
  baseCode: { language: string; code: string }[];
  testcases: {
    inputCase: string[][];
    outputCase: string[][];
    description: string;
  };
}

// 코드 에디터 컴포넌트 시작
const CodeEditor: React.FC<CodeEditorProps> = ({ baseCode, testcases }) => {

  const [languageState, setLanguageState] = useState<LanguageState>({
    isOpen: false,
    options: [],
    selectedOption: null,
  });
  const [code, setCode] = useState<string>('');

  // 선택된 언어에 대한 기본 코드를 설정하는 함수
  const setDefaultCode = (selectedLanguage: string | null) => {
    if (selectedLanguage) {
      const defaultCode = baseCode.find((item) => item.language === selectedLanguage)?.code;
      if (defaultCode) {
        setCode(defaultCode);
      }
    }
  };

  useEffect(() => {
    if (baseCode && baseCode.length > 0) {
      const languages = baseCode.map((item) => item.language);
      setLanguageState((prevState) => ({ ...prevState, options: languages }));
      // 선택된 언어에 대한 기본 코드 설정
      setDefaultCode(languageState.selectedOption);
    }
  }, [baseCode, languageState.selectedOption]); // 여기서 setDefaultCode를 직접 의존성으로 설정
  
  useEffect(() => {
    // 선택된 언어가 변경될 때마다 해당 언어에 대한 기본 코드 설정
    setDefaultCode(languageState.selectedOption);
  }, [languageState.selectedOption]); // 여기서도 setDefaultCode를 직접 의존성으로 설정
  
  

  const handleOptionSelect = (option: string) => {
    setLanguageState((prevState) => ({ ...prevState, selectedOption: option, isOpen: false }));
  };

  const toggleLanguageDropdown = () => {
    setLanguageState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }));
  };

  const handleCodeChange = (newCode: string | undefined) => {
    console.log('New code:', newCode);
    setCode(newCode ?? '');
  };

  const handleOnclick = () => {
    alert('버튼 클릭');
    /* 변수 미사용 에러 없애기 위해 */
    console.log(testcases);
  };

  // 화면 이동을 위한 navigate 변수 설정
  const navigate = useNavigate();

  const handleSubmit = () => {

    {/* post로 보낸 다음 받은 결과에 따라 나눠서 모달 띄우기 */ }
    Swal.fire({
      title: "성공!",
      showCancelButton: true,
      confirmButtonText: "홈으로 돌아가기",
      customClass: {
        popup: styles['custom-modal-style'],
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/home');
      }
    });

  };

  const handleInitailizeCode = () => {
    const selectedLanguage = languageState.selectedOption;
    if (selectedLanguage) {
      const defaultCode = baseCode.find((item) => item.language === selectedLanguage)?.code;
      if (defaultCode) {
        setCode(defaultCode);
      }
    } else {
      // 선택된 언어가 없을 경우 초기화하지 않음
      setCode('');
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.CodeEditor}>
        <div className={styles.select_language__btn}>
          <SelectLanguageBtn
            options={languageState.options}
            selectedOption={languageState.selectedOption}
            setSelectedOption={handleOptionSelect}
            toggle={toggleLanguageDropdown}
            isOpen={languageState.isOpen}
          />
        </div>
        <div className={styles.textareaContainer}>
          <Editor
            value={code}
            onChange={handleCodeChange}
            options={{
              fontSize: 15,
              minimap: { enabled: false },
              scrollbar: {
                vertical: 'auto',
                horizontal: 'auto',
              },
            }}
          />
        </div>
      </div>
      <div className={styles.result_section}>
        <div className={styles.result_title_container}>
          <div className={styles.result_title}>실행 결과</div>
        </div>
        <div className={styles.result_container}>{/* 실행 결과를 표시하는 부분 */}</div>
        <div className={styles.button_container}>
          <Button value="초기화" className={styles.initialize_btn} onClick={handleInitailizeCode} />
          <Button value="실행하기" className={styles.execution_btn} onClick={handleOnclick} />
          <Button value="제출하기" className={styles.submit_btn} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
