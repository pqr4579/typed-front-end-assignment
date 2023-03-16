# Typed Frontend Engineer 기술 과제

> ## 목차<br>

> - [기간](#기간)
> - [사용기술](#사용기술)
> - [구현된 기능](#구현된-기능)
> - [데모](#데모)
> - [실행방법](#실행방법)
> - [접속 URL](#접속-url)
> - [디렉토리 구조](#디렉토리-구조)

## 기간

2023-03-13 ~ 2023-03-16

## 사용기술

- React 18
- TypeScript 4.9.5
- styled-components ( CSS In JS )
- Recoil ( State )
- Toastify ( Toast UI )

## 구현된 기능

- [x] url , image 리소스 추가, 삭제
- [x] 리소스 이름 변경
- [x] 리소스 등록 validation
- [x] url 리소스와 image 리소스를 클릭하면 뷰어에 표시
- [x] 성공시 성공 토스트
- [x] 실패시 실패 토스트

## 데모

![이미지등록 시연 영상](https://user-images.githubusercontent.com/37769573/225485848-d0160263-6119-4784-ab4c-bcb00fe2a236.gif)

<p>이미지 등록 </p>

![뷰어 시연 영상](https://user-images.githubusercontent.com/37769573/225486253-8185c813-266e-49e2-98ca-82121668a39e.gif)

<p>뷰어 </p>

## 실행방법

```
$ git clone https://github.com/pqr4579/typed-front-end-assignment.git
$ npm install or yarn
$ npm run start or yarn start
```

## 접속 URL

http://localhost:3000

## 디렉토리 구조

```
├── App.tsx
├── atom
│   ├── appSetting.ts
│   ├── index.ts
│   └── resource.ts
├── components
│   ├── newResourceInput
│   │   └── newResourceInput.tsx
│   ├── resourceItem
│   │   └── resourceItem.tsx
│   ├── resourceList
│   │   └── reseourceList.tsx
│   └── resourceViewer
│       └── viewer.tsx
├── const
│   └── index.ts
├── designComponent
│   ├── flatButton
│   │   └── flatButton.tsx
│   ├── index.ts
│   ├── overlay
│   │   └── overlay.tsx
│   ├── space
│   │   └── space.tsx
│   ├── textInput
│   │   └── textInput.tsx
│   └── tooltip
├── hooks
│   └── useResource.ts
├── index.css
├── index.tsx
├── logo.svg
├── model
│   └── index.ts
├── setupTests.ts
└── utils
    └── index.ts
```
