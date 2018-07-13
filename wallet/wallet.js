<!-- 引入bip相关套件 -->
var bip39 = require('bip39');
var hdkey = require('ethereumjs-wallet/hdkey');
var util = require('ethereumjs-util');

<!-- 随机生成助记词 -->
var mnemonic = bip39.generateMnemonic();
console.log("助记词:" + mnemonic);

<!-- 根据助记词产生二进制seed -->
var seed = bip39.mnemonicToSeed(mnemonic);

<!-- 使用 seed 产生 HD Wallet。如果要说更明确，就是产生 Master Key 并记录起来。 -->
var hdWallet = hdkey.fromMasterSeed(seed);

var key1 = hdWallet.derivePath("m/44'/60'/0'/0/0");

<!-- 使用 keypair 中的公钥产生 address。 -->
var address1 = util.pubToAddress(key1._hdkey._publicKey, true);
console.log("以太地址-转换前:" + address1);

<!-- 基于BIP55协议对地址进行再次编码，获取最终ETH地址 -->
address1 = util.toChecksumAddress(address1.toString('hex'));
console.log("以太地址-转换后:" + address1);
