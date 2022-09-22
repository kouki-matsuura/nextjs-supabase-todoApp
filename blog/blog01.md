# Next.js + Vercel + Supabase を用いたアプリ開発

こんにちは！ラクス入社１年目のkoki_matsuraです。

本日は、Next.jsとVercel、Supabaseを用いた簡単なアプリを開発する手順についてお話しできればと思います。

アジェンダは以下の通りです。

- [Next.js + Vercel + Supabase を用いたアプリ開発](#nextjs--vercel--supabase-を用いたアプリ開発)
  - [Next.jsとは](#nextjsとは)
  - [Vercelとは](#vercelとは)
  - [Supabaseとは](#supabaseとは)
  - [ToDoアプリ作成](#todoアプリ作成)
    - [Supabaseにデータベースを用意](#supabaseにデータベースを用意)
    - [VercelでNext.jsプロジェクトを作成・デプロイ・GitHub連携](#vercelでnextjsプロジェクトを作成デプロイgithub連携)
    - [VercelとSupabaseの連携](#vercelとsupabaseの連携)
    - [GitHubからクローン](#githubからクローン)
    - [Vercelから環境変数を取得](#vercelから環境変数を取得)
    - [Supabaseのデータベースに接続](#supabaseのデータベースに接続)
    - [コード編集](#コード編集)
  - [終わりに](#終わりに)

## Next.jsとは

Next.jsはReactベースのアプリケーションフレームワークです。

公式サイトではNext.jsとはReactを用いたWebアプリ開発で生じる問題を全て解決する言語だと紹介されています。

ReactとNext.jsを比較すると、大きく以下のような違いがあります。
- サーバの有無
  
  これがNext.jsとReactの1番の違いです。
  
  Next.jsはサーバー機能を持っているのですが、Reactはサーバー機能を持っていません。そのため、Next.jsは単体でWEBアプリを動かすことができます。Reactはサーバーを別に用意し、サーバー用のモジュールやディレクトリなどを考えないといけないため、学習のコストが高くなります。
- フレームワークかライブラリか

    Next.jsはアプリケーションフレームワークとしてWEBアプリケーションの土台として使われ、Reactは部分的にDOMの値で表示を変化させることに特化しているViewライブラリとして使われます。

- 部分導入
  
  Next.jsはフレームワークなので、部分導入はできません。一方、ReactはライブラリなのでRuby on RailsやDjangoのフレームワークに取り入れることが可能になっています。


次に、Next.jsは以下のような特徴があります。
- 画像の最適化

    Next.jsにはimgタグの代わりとなるImageタグがあり、これを使うことで画像の次世代フォーマットであるWebPへ自動で変換し、高速に画像を表示することができます。
- ファイルベースルーティング

    通常、WEBページを表示したい場合は特定のフォルダ配下にindex.htmlを配置します。しかし、Next.jsでは導入時点で"pages"というフォルダがあり、その配下にファイルを配置すると自動でパスが生成されます。
- ハイブリッドレンダリング

    ReactではCSR(Client Side Rendering)にのみ対応しています。CSRはページのサイズが大きい時にローディング時間が長くなってしまうというデメリットがあり、SEO的にも悪くなると考えられます。
    
    一方、Next.jsではCSRだけでなく、SSR(Server Side Rendering)にも対応しており、ページごとに個別にレンダリング方法を設定できます。また、プレレンダリングも可能で、最初にページにアクセスする際にHTMLを提供するため、レンダリングの速度を大幅に軽減することが期待できます。
- ファストリフレッシュ

    ソースコードに変更があったときにその箇所のみが再描画する機能です。これにより効率的に開発を進めることができます。


以上のことから、WEBアプリ開発における開発者の手間を省いてくれるフレームワークになっています。

## Vercelとは

Next.jsを開発したVercel Inc.が提供してるホスティングサービスです。GitHubなどのリポジトリと連携することで簡単に作成したWEBアプリを数十秒でデプロイできます。

## Supabaseとは

SupabaseはSupabase Pte. Ltd.が開発している開発者向けオープンソースのデータベースプラットフォームです。

SupabaseはFirebaseと比較し、大きな違いとして、データベースが挙げられます。FirebaseはNoSQLを用いてることに対して、SupabaseはPostgreSQLを用いています。また、Supabaseの管理画面はとても直感的で個人的には調べなくても操作しやすいです。なので、普段からリレーショナルデータベースを触っている人からすれば、Firebaseよりも学習コストを少なく始められるものになっています。

## ToDoアプリ作成

これから実際に先ほど紹介させていただいた「Next.js」「Vercel」「Supabase」を用いて、入力した文字列がリスト型に出力される基本的な機能しか持たないToDoアプリを作成、デプロイするまでを手順を追って説明したいと思います。


### Supabaseにデータベースを用意

まずはSupabaseにデータベースを用意していきます。

[Supabase](https://supabase.com)のサイトで「Sign in」しましょう。
アカウントをお持ちでない方は「Start your project」をクリックしてください。
下記の画面が表示されれば、「Sign in with GitHub」を押し、GitHubと連携しましょう。
![supabase初期画面](./blogImage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2014.53.58.png)

成功すれば、下記のような画面が表示されます。この画面左上にある「New Project」をクリックします。
![プロジェクト作成画面](./blogImage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2015.06.00.png)

組織名・Name・Database Password・Regionはご自由に設定してください。
設定が終われば、「Create new project」をクリックします。
![プロジェクト詳細設定](./blogImage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2015.10.09.png)
ホーム画面が表示されていれば成功です。

では、本題となるデータベースを作成します。サイドバーから「SQL Editor」を選択後、左上に表示される「New query」をクリックします。
![SqlEditor](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2017.47.55.png)
すると、エディターが表示されますので下記のようなコードを入力し、右下の「Run」をクリックし実行させます。

ToDoアプリを作成するため、ID、タイトル、達成したか、作成した時間をカラムとして持たせます。

![テーブル作成](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2016.06.08.png)

テーブルが作成されたかは、サイドバーから「Database」をクリックし、表示された画面にコード通りのテーブルがあるかで判断できます。
正常に実行されていれば、下記の画像のようになります。
![データベース画面](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2017.57.15.png)
以上でSupabase上でデータベースが作成できました。
次はVercel上でNext.jsのプロジェクトを作成し、デプロイ、GitHub連携していきましょう。

### VercelでNext.jsプロジェクトを作成・デプロイ・GitHub連携

[Vercel](https://vercel.com/login?next=)のサイトで「Continue with GitHub」をクリックしましょう。

下記のような画面が表示されるので、右上から「Add New Project」をクリックしましょう。
![Vercelプロジェクト作成](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2016.30.43.png)
Next.jsのプロジェクトを作成したいのでテンプレートを選択しましょう。
![Next.jsのテンプレ](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2016.32.45.png)
下記の画像ではGitリポジトリを作成しています。自分のアカウントを「GIT SCOPE」で選択し、「REPOSITORY NAME」には自由に名前をつけてください。
「Create private Git Repository」はチェックを入れるとprivateリポジトリとして作成されます。

「Create」をクリックするとGitリポジトリが作成され、自動でデプロイまでしてくれます。

![Next.jsプロジェクト作成](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2017.59.18.png)

デプロイ完了後、ダッシュボードに戻ると下記の画像のようになっています。
「View Git Repository」をクリックすると自分のGitアカウントにリポジトリが作成されていることが確認できます。「Visit」を押すと、作成したプロジェクトがデプロイされていることが確認できると思います。
![Vercelプロジェクト詳細画面](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2018.04.26.png)
以上で、Vercel上でNext.jsプロジェクトを作成、デプロイ、GitHubとの連携が完了しました。

次はVercelとToDoアプリ用のデータベースを作成したSupabaseを連携をします。
### VercelとSupabaseの連携
まず、先ほどの作成したプロジェクトが表示されている画面から「Settings」に移動します。
「Browse Marketplace」をクリックし、「Supabase」を検索します。
![Settings画面](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2017.00.46.png)
検索結果に二つ出てきますが、「Supabase」と書かれている方を選択します。
![Supabaseを取得](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2017.01.10.png)
「Add Integration」をクリックしましょう。
![Supabase Add Integration](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2017.07.12.png)
Supabaseをどのアカウントに統合するのかを選択します。
![Supabase詳細設定その1](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2017.11.48.png)
この画面ではどのプロジェクトにSupabaseを統合するのかを設定します。

「All Projects」を選択すれば、すべてのプロジェクトに統合されます。今回はToDoアプリだけに統合したいので、「Specific Projects」を選択します。そして、該当するプロジェクトを選択しましょう。
選択が終われば、「Continue」をクリック。
![Supabase詳細設定その2](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2018.10.51.png)
Vercel上で先ほど作成したプロジェクトとSupabaseで作成したデータベースをそれぞれ選択し、「Add Integration」をクリックして連携します。
![Supabase連携完了](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-20%2018.11.40.png)
これでVercelとSupabaseの連携は終わりました。

次は作成されたGitリポジトリをクローンします。

### GitHubからクローン
自身のGitHubにアクセスすると、先ほどVercel上で作成したプロジェクトがあるので、SSHをコピーしましょう。
![GitHubプロジェクト画面](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-21%2010.15.23.png)
CLIを開き、下記のコマンドを実行し、ローカル環境にクローンします。
![クローンコマンド](./blogimage/carbon-2.png)
クローンができれば、好きなコードエディターで開き、下記のコードでローカル開発サーバーを起動する。
![ローカル開発サーバー起動](./blogimage/carbon%E8%B5%B7%E5%8B%95.png)

起動が終われば、[http://localhost:3000](http://localhost:3000)にアクセスする。

テンプレートと同じプロジェクトが表示されれば、成功です。
![ローカル環境](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-21%2011.02.40.png)

### Vercelから環境変数を取得
Vercelで作成したプロジェクトには下記のような連携したSupabaseの環境変数が「Settings」の「Environment Variables」にあります。
![Vercel環境変数](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-21%2011.36.53.png)
Vercel上の環境変数を取得するためにCLIで下記のコマンドでVercelにログインします。

![VercelLogin](./blogimage/npxVercel.png)

「Ok to proceed?」には「y」と入力すると、ブラウザが開くので、「Continue with GitHub」を選択します。ブラウザに「CLI Login Success」と表示されるとログイン成功です。

次にVercelプロジェクトをローカル環境にクローンしたプロジェクトにリンクします。下記のコマンドを入力します。
![VercelLink](./blogimage/vercelLInk.png)

該当するプロジェクトなら「y」を入力します。
![VercelLinkAns](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-21%2012.07.55.png)
プロジェクトをリンクできたので、下記のコマンドを入力することでプロジェクトの環境変数を取得します。
![VercelPull](./blogimage/vercelPull.png)

成功すれば、プロジェクトに「.env」が作成されます。ここにはSupabaseの環境変数が含まれています。

この環境変数はGitにあげてはいけないのでファイル名を「.env.local」に変更し、無視されるようにします。

以上で、Vercelの環境変数を取得できました。

次はこの環境変数を用いて、Supabaseのデータベースに接続します。

### Supabaseのデータベースに接続
Supabaseで作成したデータベースに接続するためにはSupabaseクライアントが必要となるので、下記の2つのコマンドで型定義とSupabaseクライアントをインストールします。

![importSupabaseJS](blogimage/supabase-js.png)

インストールが完了すれば、「utils/supabase.ts」を作成し、次のコードを入力します。このコードでは、Supabaseクライアントを初期化しています。
![createClient](blogimage/createClient.png)
Supabaseクライアントを用いて、データベースを操作する準備ができたので、実際にコードを編集していきます。

### コード編集
現時点のコードはNext.jsのテンプレートのものなので、コードを編集します。入力部と出力部を用意して、シンプルなToDoアプリを作りましょう。

入力部のコンポーネント「/components/InputToDoForm.tsx」を作成します。コードは下記のようにします。

pushTodo関数でデータベースのテーブルtodosに入力内容を追加しています。
fetchTodosは入力部、出力部両方で使用するのでHooks化しています。
![input](./blogimage/inputtodoform.png)

出力部のコンポーネント「/components/ToDoList.tsx」を作成します。コードは下記のようにします。
![output](./blogimage/todolist.png)

fetchTodosを記述している「Hooks/useAddTodo.ts」を作成します。コードは下記のようにします。

fetchTodosはデータベースtodosから全件取得してきます。
![useaddtodo](./blogimage/useaddtodo.png)

コンポーネントの作成、内部の処理ができたので、テンプレートのコードが記述されている「pages/index.tsx」を下記のように編集します。
![index](./blogimage/index.png)
編集が終われば、ローカル環境を立ち上げ、[http://localhost:3000](http://localhost:3000)にアクセスします。入力部と"todoリスト"の文字列があれば問題ありません。
![編集後のTodoアプリ](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-22%2021.51.50.png)
入力部に適当な文字列をうち、その文字列が"todoリスト"の文字列の下にリストで表示されていれば、完成です。

「テスト１」「テスト2」「テスト3」と3度入力した場合は以下のようになります。
![todoアプリテスト](./blogimage/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-09-22%2021.58.00.png)
入力と出力に問題はなかったので、GitHubにプッシュします。
そして、プッシュ後、Vercelにログインすると自動でビルド・デプロイをしてくれます。

Vercelの該当プロジェクトの画像がテンプレートのものからToDoアプリのものに変わっていればデプロイが終わっています。
![todoアプリデプロイ](./blogImage/スクリーンショット%202022-09-22%2022.10.33.png)

## 終わりに
Next.jsとVercel、Supabaseを用いた簡単なアプリを開発する手順についてご紹介させていただきました。

Supabaseのデータベース作成は非常に簡単で、VercelもGitHubの連携さえすれば、自動でビルド・デプロイしてくれるので開発に集中できました。

是非、Next.jsのアプリケーションを作ろうとしている方はSupabase+Vercelを使ってみてください。




