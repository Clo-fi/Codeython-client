import React, { useState } from 'react'
import styles from './LoginForm.module.scss'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';
import instance from '../../../api/axios';
import useAuthStore from '../../../store/AuthStore';

const LoginForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ username: '', password: '' });
  const [, setCookies] = useCookies(['accessToken', 'refreshToken']);
  const { setLogined } = useAuthStore();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { username, password } = state;
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      const response = await instance.post('/login', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      const { accessToken, refreshToken } = response.data;
      setCookies('accessToken', accessToken, { path: '/' })
      setCookies('refreshToken', refreshToken, { path: '/' })
      setLogined();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
      console.error(error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const signupNavigationHandler = () => navigate('/signup');
  return (
    <div className={styles.login_page__body}>
      <div className={styles.login_page__login_container}>
        <img className={styles.login_page__logo} src="/Imgs/CodeythonLogo_star.png" alt="codeythonLogo" />
        <form className={styles.login_page__form} onSubmit={onSubmitHandler}>
          <input className={styles.login_page__input} value={state.username} placeholder='ID :' type='text' name="username" onChange={handleChange} required />
          <input className={styles.login_page__input} value={state.password} placeholder='Password :' type='password' name="password" onChange={handleChange} required />
          <div className={styles.login_page__button_container}>
            <button className={styles.login_page__submit_button} onClick={signupNavigationHandler} type="button">회원가입</button>
            {/* <button onClick={() => setLogined()} type="button">테스트</button> */}
            <button className={styles.login_page__submit_button} type="submit">로그인</button>
          </div>
        </form>
      </div>
    </div >
  )
}

export default LoginForm
