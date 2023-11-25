"use client"

import React from "react";

function DocsPage() {
  return <main className="container mx-auto">
    <h2 className="text-2xl my-3">API仕様</h2>
    <p>TODO</p>
    <h2 className="text-2xl my-3 pt-4">ファイル仕様</h2>
    <div className="">
      <h3 className="text-xl my-2 pt-2">CSVフォーマット</h3>
      <pre className="whitespace-pre-wrap">
        ヘッダー1行<br/>
        要素は以下<br/>
        <div className="bg-gray-100 border border-gray-200 text-sm text-gray-800 rounded-lg p-4 dark:bg-gray-800 dark:border-white/20 dark:text-white">
          IDENTIFIER:端末識別ID 必須<br/>
          DT:日時 必須<br/>
          LATITUDE:緯度 必須<br/>
          LONGITUDE:経度 必須<br/>
          RISK:リスク(0-5) マーカーの色を制御 なければ黒色表示<br/>
          PM25:PM2.5(0-5)<br/>
          VOC:揮発性有機化合物(0-5)<br/>
          CO2:二酸化炭素(0-5)<br/>
        </div>
      </pre>
      <h4 className="text-lg my-2 pt-2">サンプル</h4>
      <ul className="p-2 list-disc list-inside text-gray-800 dark:bg-gray-800 dark:text-white">
        <li>CSVデータ:
          <a className="px-2 text-gray-800 underline decoration-gray-800 hover:opacity-80 dark:text-white dark:decoration-white" href="/data/sample.csv">/data/sample.csv</a>
        </li>
      </ul>

      <h3 className="text-xl my-2 pt-2">JSONフォーマット</h3>
      <pre className="whitespace-pre-wrap">
        rootは配列<br/>
        要素は以下<br/>
        <div className="bg-gray-100 border border-gray-200 text-sm text-gray-800 rounded-lg p-4 dark:bg-gray-800 dark:border-white/20 dark:text-white">
          lat:緯度 必須<br/>
          long:経度 必須<br/>
          type:種別または詳細データ 文字列、またはJSON<br/>
          val:数値 0 - 225 マーカーの色を制御 なければ黒色表示<br/>
          img:画像URL クリック時に表示
        </div>
      </pre>
      <h4 className="text-lg my-2 pt-2">サンプル</h4>
      <ul className="p-2 list-disc list-inside text-gray-800 dark:bg-gray-800 dark:text-white">
        <li>1種類のデータ:
          <a className="px-2 text-gray-800 underline decoration-gray-800 hover:opacity-80 dark:text-white dark:decoration-white" href="/data/sample.json">/data/sample.json</a>
        </li>
        <li>詳細付きのデータ:
          <a className="px-2 text-gray-800 underline decoration-gray-800 hover:opacity-80 dark:text-white dark:decoration-white" href="/data/sample3.json">/data/sample3.json</a>
        </li>
        <li>画像付きのデータ:
          <a className="px-2 text-gray-800 underline decoration-gray-800 hover:opacity-80 dark:text-white dark:decoration-white" href="/data/sample4.json">/data/sample4.json</a>
        </li>
      </ul>
    </div>
    <h2 className="text-2xl my-3 pt-4">環境センサー情報</h2>
    <p>TODO</p>
  </main>
}

export default DocsPage;