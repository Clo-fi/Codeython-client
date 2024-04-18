import React, { useState } from 'react'
import styles from './SignUpForm.module.scss'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import instance from '../../../api/axios';
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
        Swal.fire({
          icon: 'error',
          title: '비밀번호 확인 실패',
          text: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        });
        return;
      }
      const { username, nickname, password } = state;
      const response = await instance.post('/signup', { username, nickname, password });
      console.log(response);
    } catch (error) {
      Swal.fire({
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
          <input className={styles.signup_page__input} placeholder='닉네임 :' type='text' name="nickname" value={state.nickname} onChange={handleChange} required />
          <input className={styles.signup_page__input} placeholder='ID : ' type='text' name="username" value={state.username} onChange={handleChange} required />
          <input className={styles.signup_page__input} placeholder='Password :' type='password' name="password" value={state.password} onChange={handleChange} required />
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