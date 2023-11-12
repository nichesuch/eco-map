"use client"

import * as Icon from 'react-feather';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-4 sm:p-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a href="/map">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className='text-center mx-auto p-4'>
              <Icon.MapPin width={50} height={50} className='hidden dark:block' color='white' />
              <Icon.MapPin width={50} height={50} className='block dark:hidden' color='black' />
            </div>
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                環境マップ
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                集めた環境センサーのデータを地図上にプロットしてみてみよう
              </p>
            </div>
          </div>
        </a>
        <a href="/docs">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className='text-center mx-auto p-4'>
              <Icon.FileText width={50} height={50} className='hidden dark:block' color='white' />
              <Icon.FileText width={50} height={50} className='block dark:hidden' color='black' />
            </div>
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                ドキュメント
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                環境マップの使い方、環境センサーやAPI、JSONフォーマットについて
              </p>
            </div>
          </div>
        </a>
      </div>
    </main>
  )
}
