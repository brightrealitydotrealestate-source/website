async function get() {
  const r = await fetch('https://www.youtube.com/@KUSHIBUSY');
  const text = await r.text();
  console.log(text.match(/"channelId":"(UC[^"]+)"/)[1]);
}
get();
