async function run() {
  let cg =
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
  let node = "https://web3.1inch.exchange/";
  let v = "0xab5801a7d398351b8be11c439e05c5b3259aec9b";

  let price = await fetch(cg).then((response) => response.json());

  price = price.ethereum.usd;

  let balance = await fetch(node, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [v, "latest"],
      id: 1,
    }),
  }).then((response) => response.json());

  balance = parseInt(balance.result, 16) / 1e18;

  var formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });

  let total = price * balance;
  let formatted = formatter.format(total);
  let text =
    total >= 1000000000
      ? "<h2 id='yes'>YES!</h2>"
      : "<h2 id='no'>NO!</h2>";
  text += `<p>1 ETH = ${formatter.format(
    price
  )} USD (<a href="https://www.coingecko.com/en/coins/ethereum" target=”_blank”>Coingecko</a>)</p><p>Vitalik's stash of <strong>${new Intl.NumberFormat().format(
    balance
  )} ETH</strong> is worth <strong>${formatted}</strong></p>`;
  document.getElementById("answer").innerHTML = text;
}
run();
