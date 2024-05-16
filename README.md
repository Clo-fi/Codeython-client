# Codeyton-client

![대표사진](/public/Imgs/CodeythonLogo_star.png)
**_코디톤(Codeython)_** 은 구름 1차 IDE 만들기 프로젝트의 주제로 진행된 프로젝트입니다.<br/>

##### 코딩테스트와 마라톤을 합친 뜻으로 사용자는 코딩테스트를 재밌게 즐길 수 있도록<br/>다른 사용자들과 함께코딩테스트에대한 두려움과 불안감을 떨쳐 낼 수 있도록 힘을 쓴 알고리즘 게임 형식의 프로젝트입니다.

## Codython from Clo-fi

- 프로젝트 진행 기간: 2023.04.11 ~ 2023.04.25
- https://kc3837296ecb6a.user-app.krampoline.com/
- https://www.notion.so/goorm/1-Clo-fi-477b1a613baf4cdd8ce5d6539f993e0c?pvs=4

## Team

|  팀원  |  역할  |
| :----: | :----: |
| 김예린 | 프론트 |
| 김민지 | 프론트 |
| 한우혁 | 프론트 |
| 김용빈 | 백엔드 |
| 권지환 | 백엔드 |
| 이민규 | 백엔드 |
| 이혁준 | 백엔드 |

## Process Architecture

![사진5](/public/readmeImgs/img5.png)

## Front-End Tech Stack

- React
- typescript
- zustand
- axios
- vite

## Deploy

- Krampoline ide
- D2HUB
- Kargo
- Kubernetis
- Docker

## 프로젝트 소개

![사진1](/public/readmeImgs/img0.png)

|                                       |                                       |                                       |                                       |
| :-----------------------------------: | :-----------------------------------: | :-----------------------------------: | :-----------------------------------: |
| ![사진1](/public/readmeImgs/img1.png) | ![사진2](/public/readmeImgs/img2.png) | ![사진3](/public/readmeImgs/img3.png) | ![사진4](/public/readmeImgs/img4.png) |
|                                       |                                       |                                       |                                       |

## 시연 영상

[시연 영상](https://drive.google.com/file/d/174hStHNZWSNoxH1P3DUSQQMqQ5bnSkfq/view?usp=sharing)

## 발표 자료

- https://docs.google.com/presentation/d/1PQ1hcBPc_Nb0JrPQ-iBCKFcLmSF4IQszJC995z7VClc/edit#slide=id.p

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules..

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
