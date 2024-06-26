import React, { useState } from 'react'
import styles from './SignUpForm.module.scss'
import { useNavigate } from 'react-router-dom';
import instance from '../../../api/axios';
import { CustomAlert } from '../../../libs/sweetAlert/alert';

interface FormType {
  nickname: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<FormType>({ nickname: '', username: '', password: '', confirmPassword: '' })

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (state.password !== state.confirmPassword) {
        CustomAlert.fire({
          icon: 'error',
          title: '비밀번호 확인 실패',
          text: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        });
        return;
      }
      const { username, nickname, password } = state;
      const response = await instance.post('/signup', { username, nickname, password });
      console.log(response);
      CustomAlert.fire({
        icon: "success",
        title: "회원가입 성공",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      CustomAlert.fire({
        icon: 'error',
        title: '오류 발생',
        text: '회원가입 중 오류가 발생했습니다.',
      });
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const loginNavigationHandler = () => navigate('/');
  return (
    <div className={styles.signup_page__body}>
      <div className={styles.signup_page__logo_container}>
        <img className={styles.signup_page__logo} src="/Imgs/CodeythonLogo.png" alt="codeythonLogo" onClick={loginNavigationHandler} />
      </div>
      <div className={styles.signup_page__form_container}>
        <form onSubmit={onSubmitHandler} className={styles.signup_page__form}>
          <input className={styles.signup_page__input} placeholder='닉네임 : 2 ~ 10글자' type='text' name="nickname" value={state.nickname} onChange={handleChange} required maxLength={10} />
          <input className={styles.signup_page__input} placeholder='ID : 6 ~ 20 글자 영문과 숫자' type='text' name="username" value={state.username} onChange={handleChange} required maxLength={20} />
          <input className={styles.signup_page__input} placeholder='Password : 6 ~ 20 글자' type='password' name="password" value={state.password} onChange={handleChange} required maxLength={20} />
          <input className={styles.signup_page__input} placeholder='Confirm Password :' type='password' name="confirmPassword" value={state.confirmPassword} onChange={handleChange} required />
          <div className={styles.signup_page__button_container}>
            <button type='submit' className={styles.signup_page__submit_button}>가입하기</button>
            <p onClick={loginNavigationHandler}>로그인 하기</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpForm