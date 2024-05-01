## 概要
Reactのコンポーネントおよび[Storybook](https://storybook.js.org/)用のファイルの鋳型を作成するスクリプトです。  
コマンド時にコンポーネント名を入力して実行すると、  
入力したコンポーネント名のディレクトリとそのディレクトリ内に下記3つのファイルを生成します。  
`[コンポーネント名].tsx`  
`[コンポーネント名].stories.tsx`  
`index.ts`  

## インストール
`npm i create-react-component-with-stories --save-dev`

## 使い方
コンポーネントを作成したいディレクトリに移動して、  
`npx create cp`に続いてコンポーネント名を入力してから実行します。  

sample:`npx create cp button`
  
コンポーネント名は一度に複数入力できます。  
`npx create cp arg1 arg2...`
