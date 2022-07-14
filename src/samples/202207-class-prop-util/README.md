# class-prop-util

jsx で`<Q.div class={["a", "b", "c", { isHoge: false, isFuga: true }]}>`のように書くために[clsx](https://github.com/lukeed/clsx)を内包した util component を試しに実装

- `Q`である意味なあまりない(後に npm ライブラリ化することを考慮したとき、わかりやすいかつ印象的な名称をパッと思いついただけ)

- [参考ソースコード](/src/_common/Q/index.tsx)

## before/after

```tsx
export default function Page() {
  return (
    <Q.div class={["a", "b", "c", { isHoge: false, isFuga: true }]}>
      <Q.h2>class-prop-util</Q.h2>

      <Q.div class={["foo", true && "bar", "baz"]}>
        <Q.span class={["foo", 0, false, "bar"]}>hello react-q!</Q.span>
      </Q.div>
    </Q.div>
  )
}
```

↓

```html
<div class="a b c isFuga">
  <h2>class-prop-util</h2>

  <div class="foo bar baz">
    <span class="foo bar">hello react-q!</span>
  </div>
</div>
```

## 自分用メモ

- [JSX なしで React を使う(公式 docs)](https://ja.reactjs.org/docs/react-without-jsx.html)
- [Proxy - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
  - object を偽装したり任意の動作を追加できる js の hack、今回は div や span などの大量の html タグを js 上で定義せずに実装するために使用
