# <img src="./src-tauri/icons/memoniumIcon.svg" width="40"> Memonium

## 目次

1. [概要](#概要)
1. [技術スタック](#技術スタック)
1. [実行例](#実行例)
1. [バージョン情報](#バージョン情報)
1. [To Do List](#to-do-list)
1. [開発メタデータ](#開発メタデータ)

## 概要

様々なメモの形態をオールインワンにしたメモアプリ(理想)<br>

1. URL コレクション(実装中)<br>
   ネット上の記事を記録し保存しておくための専用メモ機能

随時追加予定

<!-- 1. シンプルメモ(未実装)<br>
   シンプルなメモ機能

1. 付箋メモ(未実装) -->

## 技術スタック

- [Tauri](https://tauri.app/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Chakra ui](https://v2.chakra-ui.com/)
- [Rust](https://www.rust-lang.org/ja/)

## 実行例

- 準備中

## バージョン情報

Version 0.1.6

- 更新履歴
  - Ver.0.1.0 --- (2024.09.30)
    - beta 版
  - Ver.0.1.1 --- (2024.10.16)
    - スプラッシュスクリーンの文字表示変更
    - 背景色の設定の変更
  - Ver.0.1.2 --- (2024.10.17)
    - 各タイトルが編集・消去アイコンに被るバグの修正
    - 最小ディスプレイサイズの設定
  - Ver.0.1.3 --- (2024.10.18)
    - URL コレクションの初期状態の修正
    - スプラッシュスクリーンにバージョン情報を表記
    - リンクを既存ブラウザで開けるように変更
  - Ver.0.1.4 --- (2024.12.22)
    - コンテンツを削除する際に警告を発するように変更
  - Ver.0.1.5 --- (2025.01.09)
    - カードのみをスクロールできるように修正
    - データ読み込み状態(スピナー)追加
  - Ver.0.1.6 --- (2025.02.11)
    - アプリアイコンを新しく作成・設定
    - URL カードのスクロールバグを修正

## To Do List

1. データの保存方法を変更(JSON -> DBMS)
1. Chakra UI v3 への対応
1. アプリケーションデザインの刷新
1. ラベル機能の追加(グループ化)
1. ソート機能の追加
1. メモ内容のファイル出力(.txt, .csv)
1. 参照先の内容を LLM で要約
1. アップデーター機能の追加

## 開発メタデータ

作成者&emsp;&emsp;&emsp;MakitaKoya</br>
開発期間&emsp;&emsp;2024 年 09 月~開発中</br>
公開日&emsp;&emsp;&emsp;2024 年 09 月 30 日</br>
最終更新日&emsp;2025 年 02 月 11 日</br>
