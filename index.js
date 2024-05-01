#!/usr/bin/env node
"use strict";

import fs from "fs";
import { Command } from "commander";

const program = new Command();

/**
 * コンポーネントのテンプレート
 */
const componentTemp = (Name) =>
  `import React from "react";

export const ${Name} = () => {
  return <></>;
};`;

/**
 *storiesのテンプレート
 */
const storiesTemp = (Name) =>
  `import { ${Name} } from "./${Name}";

  export default {
    component: ${Name},
    title: "${Name}",
    tags: ["autodocs"],
  };
  
  export const Default = {
    args: {},
  };`;

/**
 * storiesのテンプレート
 */
const indexTemp = (Name) => `export { ${Name} } from './${Name}';`;

/**
 * 引数を名前にしたディレクトリを作成
 */
const mkdir = (Name) =>
  fs.mkdirSync(Name, (err) => {
    // 同じ名前のディレクトリがあればエラーを返す
    if (err) {
      console.log(err.toString());
      return;
    }
  });

/**
 * ファイルを作成する関数
 */
const writeFile = (Name) => {
  const dir = `${Name}/`;
  try {
    fs.writeFileSync(`${dir}/${Name}.tsx`, componentTemp(Name), "utf8");
    fs.writeFileSync(`${dir}/${Name}.stories.tsx`, storiesTemp(Name), "utf8");
    fs.writeFileSync(`${dir}/index.ts`, indexTemp(Name), "utf8");
    console.log(`${Name}コンポーネントを作成しました`);
  } catch (err) {
    console.log(err);
  }
};

/**
 * コンポーネント名のため頭文字を大文字に変換する
 */
const initialToUppercase = (Name) =>
  Name.charAt(0).toUpperCase() + Name.slice(1);

// バージョン情報
program.version("1.0.0", "-v, --version");

// コマンド
program
  .command("cp") // cp = componentの略
  .description("Reactコンポーネントとstoriesのテンプレートを作成するコマンド")
  .argument(
    "Names...",
    "コンポーネントの名前を入力します。コンポーネントのため頭文字は大文字になります。複数入力可能です。"
  )
  .action((Names) => {
    Names.map((Name) => {
      const newName = initialToUppercase(Name);
      mkdir(newName);
      writeFile(newName);
    });
  });

program.parse();
